import syslog, subprocess, time, tarfile, json, traceback
from shutil import move, copy2, unpack_archive, make_archive
from pathlib import Path
from random import randrange
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir

from models import Defaults
# Globals
_mode = 'tx'

DEFAULTS = Defaults("/etc/dd/DDConf.json") #change this parameter later to a CLI parameter
# /Globals

def _archive_d(filepath:str, location=f'/etc/dd/dd104/archive.d'):
	if exists(filepath):
		if not isdir(location):
			makedirs(location)
		
		try:
			filename = Path(filepath).name if Path(filepath).name.count('.') == 1 else Path(filepath).name.replace('.','_') #filepath.split('/')[-1].split('.')
			rtime = time.localtime(time.time())
			utime = f"{rtime.tm_year}-{rtime.tm_mon}-{rtime.tm_mday}-{rtime.tm_hour}-{rtime.tm_min}-{rtime.tm_sec}"
			copy2(filepath, f"{location}/{filename[:-4:]}-{utime}.{filename[-3::]}")
		except Exception as e:
			syslog.syslog(syslog.LOG_CRIT, f"ddconf.dd104.archive_d: провал при создании архивного файла конфигурации, операция не может быть продолжена.")
			raise e
		
	else:
		msg = f"dd104: провал при архивации файла конфигурации ({filepath}), файл конфигурации отсутствует или недоступен, операция не может быть продолжена."
		syslog.syslog(syslog.LOG_CRIT, msg)
		raise RuntimeError(msg)


def rm_inis():
	try:
		dest = Path(Defaults.DD["INIDIR"])
		for ini in listdir(dest):
			(dest/ini).unlink()
			syslog.syslog(syslog.LOG_INFO, f"ddconf.dd104.rm_inis: {str(dest/ini)} file was removed")
			print(f"ddconf.dd104.rm_inis: {str(dest/ini)} file was removed")
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"ddconf.dd104.rm_inis: Error while removing existing inis from {dest}:  {str(e)}")
		print(f"ddconf.dd104.rm_inis: Error while removing existing inis from {dest}:  {traceback.print_exception(e)}\n")


def rm_services():
	try:
		
		dest = Path('/etc/systemd/system/')
		for svc in listdir(dest):
			if f'dd104{"client" if _mode == "tx" else "server"}' in svc:
				syslog.syslog(syslog.LOG_INFO, f"ddconf.dd104.rm_services: disabling {svc} process")
				print(f"ddconf.dd104.rm_services: disabling {svc} process")
				_ = subprocess.run(f"systemctl disable --now {svc}".split())
				(dest/svc).unlink()
				syslog.syslog(syslog.LOG_INFO, f"ddconf.dd104.rm_services: {str(dest/svc)} file was removed")
				print(f"ddconf.dd104.rm_services: {str(dest/svc)} file was removed")
		_ = subprocess.run(f"systemctl daemon-reload".split())
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"ddconf.dd104.rm_services: Error while removing file:  {str(e)}")
		print(f"ddconf.dd104.rm_services: Error while removing file:  {traceback.format_exception(e)}\n")
		Path("/home/txhost/.EOUTS/dd104").write_text(traceback.format_exception(e))

def delete_ld(name: str):
	try:
		if name in list_ld():
			if name == get_active_ld():
				rm_services()
				rm_inis()
				(Path(DD104.DEFAULTS.DD['LOADOUTDIR'])/'.ACTIVE.loadout').unlink()
			
			_f = Path(DD104.DEFAULTS.DD['LOADOUTDIR'])/f"{name}{'.loadout' if '.loadout' not in name else ''}"
			_f.unlink()
		elif name+'.loadout' in list_ld():
			name = name + ".loadout"
			if name == get_active_ld():
				rm_services()
				rm_inis()
				(Path(DD104.DEFAULTS.DD['LOADOUTDIR'])/'.ACTIVE.loadout').unlink()
			
			_f = Path(DD104.DEFAULTS.DD['LOADOUTDIR'])/f"{name}{'.loadout' if '.loadout' not in name else ''}"
			_f.unlink()
		else:
			raise ValueError(f"ddconf.dd104.delete_ld: loadout name {name} is invalid.")
	except ValueError as v:
		raise v
	except Exception as e:
		msg = f"ddconf.dd104.delete_ld: couldn't remove loadout file {str(Path(DD104.DEFAULTS.DD['LOADOUTDIR'])/f'{name}')}."
		#DEBUG
		Path("/home/txhost/.EOUTS/dd104").write_text(traceback.format_exception(e))
		raise RuntimeError(e)
	else:
		return "success"

#TODO
def create_inis(data: list):
	#gets loadout contents, creates an appropriate amount of inis
	try:
		COUNT = 0
		for proc in data:
			COUNT += 1
			if proc['main'] or proc['second']:
				if not proc['main']:
					proc['main'] = proc['second']
					proc['second'] = None
				msg = f"# Файл сгенерирован Сервисом Конфигурации Диода Данных;\n# comment: {proc['comment']}\nreceiver\naddress={Defaults.RXADDR}\n\nserver\naddress1={proc['main'].split(':')[0]}\nport1={proc['main'].split(':')[1]}"
				if proc['second']:
					msg = msg+f"\naddress2={proc['second'].split(':')[0]}\nport2={proc['second'].split(':')[1]}"
				
				(Path(Defaults.DD["INIDIR"])/f"dd104client{COUNT}.ini").write_text(msg)
				syslog.syslog(syslog.LOG_INFO, f'ddconf.dd104.create_inis: Created a file at {(str(Path(Defaults.DD["INIDIR"])/"dd104client")+str(COUNT)+".ini")}. ')
				print(f'ddconf.dd104.create_inis: Created a file at {(str(Path(Defaults.DD["INIDIR"])/"dd104client")+str(COUNT)+".ini")}. ')
			else:
				raise ValueError(f"process {COUNT} data is invalid ({proc})")
	
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"ddconf.dd104.create_inis: both main and second fields of proc are empty and/or invalid! Details:  {str(e)}\n")
		print(f"ddconf.dd104.create_inis: both main and second fields of proc are empty and/or invalid! Details:  {traceback.print_exception(e)}\n")


def create_services(count:int):
	try:
		
		for i in range(1, count+1): #why was this +2 ???
			msg = f"[Unit]\nDescription=dd104client\nAfter=hasplmd.service\n[Service]\nKillMode=mixed\nExecStartPre=/bin/sleep 5\nExecStart=/opt/dd/{'dd104client/dd104client' if _mode=='tx' else 'dd104server/dd104server'} -c {Defaults.DD['INIDIR']}dd104{'client' if _mode=='tx' else 'server'}{i}.ini\nRestart=always\nUser=dd\nGroup=dd\n\n[Install]\nWantedBy=multi-user.target"
			
			_ = Path(f'/etc/systemd/system/{"dd104client" if _mode=="tx" else "dd104server"}{i}.service').write_text(msg)
			
			msg = f"ddconf.dd104.create_services: Created a file at /etc/systemd/system/dd104{'client' if _mode=='tx' else 'server'}{i}.service. "
			syslog.syslog(syslog.LOG_INFO, msg)
			print(msg)
			
			_ = subprocess.run(f'''systemctl enable {"dd104client" if _mode=="tx" else "dd104server"}{i}.service''')
			
			msg = f'ddconf.dd104.create_services: enabling {"dd104client" if _mode=="tx" else "dd104server"}{i}.service'
			syslog.syslog(syslog.LOG_INFO, msg)
			print(msg)
		
		_ = subprocess.run(f"systemctl daemon-reload".split())
		
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"dd104.create_services: couldn't create services; Details:  {str(e)}\n")
		print(f"dd104.create_services: couldn't create services; Details:  {traceback.print_exception(e)}\n")


def get_status(PID: int) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		data = subprocess.run(f"systemctl status {'dd104client' if _mode == 'tx' else 'dd104server'}{PID}".split(), capture_output=True, text=True)
		if data.stderr:
			raise RuntimeError(data.stderr)
		else:
			data = data.stdout.strip().split('\n')
		for line in data:
			if "Active:" in line:
				if "failed" in line:
					return -1
				elif "active (running)" in line:
					return 1
				elif "inactive (dead)" in line or "stopped" in line:
					return 0
				elif "activating" in line:
					return 2
				else:
					return -2
	except Exception as e:
		syslog.syslog(syslog.LOG_WARNING, f"ddconf.dd104.status: {str(e)}")
		return -2
	# return randrange(-2, 3)


def validate_ld_data(data: list) -> bool:
	flag = True
	
	for i in data:
		if 'main' not in i or not i['main']:
			flag = False
		if list(i.keys()) != ['main', 'second', 'comment']:
			flag = False
	
	return flag


def save_ld(filename: str, data : dict) -> None:
	try:
		if not filename.split('.')[-1] == 'loadout':
			filename = filename+".loadout"
		if validate_ld_data(data):
			(Path(Defaults.DD["LOADOUTDIR"])/filename).write_text(json.dumps(data))
		else:
			raise ValueError(f"dd104.save_ld: received malformed data, discarding changes.")
	except Exception as e:
		msg = f"ddconf.dd104.save_ld: an error occured: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		raise RuntimeError(msg)
	else:
		return "success"


def apply_ld(filename: str) -> None:
	try:
		if not filename.split('.')[-1] == 'loadout':
			filename = filename+".loadout"
		if (Path(Defaults.DD["LOADOUTDIR"])/filename).is_file():
			data = json.loads((Path(Defaults.DD["LOADOUTDIR"])/filename).read_text())
			if type(data) == list:
				rm_inis()
				rm_services()
				create_inis(data)
				create_services(len(data))
			elif  type(data) == dict:
				rm_inis()
				rm_services()
				create_inis([data])
				create_services(1)
			else:
				raise TypeError(f"Error while reading {filename}: data is corrupted or invalid, data type received ({type(data)}) is not in [list, dict]")
			
		else:
			raise FileNotFoundError(f"Attempted to apply {filename}; file doesn't exist or is unavailable.")
		
		if (Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").is_file():
			(Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").unlink()
		
		(Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").symlink_to(Defaults.DD["LOADOUTDIR"]+filename)
		
		return "success"
	except Exception as e:
		msg = f"ddconf.dd104.apply_ld: an error occured: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		raise RuntimeError(msg)


def get_processes(LD_ID: str) -> list:
	# will return a list of dicts with fields "main", "secondary", "comment" 
	loadouts = [x for x in listdir(Defaults.DD["LOADOUTDIR"]) if (Path(Defaults.DD["LOADOUTDIR"])/x).is_file() and (Path(Defaults.DD["LOADOUTDIR"])/x).name.split('.')[-1] == 'loadout']
	ID = LD_ID if '.loadout' in LD_ID else LD_ID+'.loadout'
	if ID in loadouts:
		data = json.loads((Path(Defaults.DD["LOADOUTDIR"])/ID).read_text())
		for i in data:
			if 'main' not in i or not i['main']:
				if 'second' in i and i['second']:
					i['main'] = i['second']
					i['second'] = None
				else:
					raise ValueError(f'dd104: "main" and "second" fields are empty or don\'t exist! ld: {data} ')
			if 'second' not in i or not i['second']:
				i['second'] = None
			if 'comment' not in i or not i['comment']:
				i['comment'] = None
		return data
	else:
		return None
	# return [{"main":"1.2.3.4", "second":"", "comment":"asdf"}, {"main":"3.4.5.6", "second":"2.3.4.5", "comment":"fdsa"}]


def get_active_ld() -> str:
	# returns the active ld ID (!!!)
	try:
		return ((Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").resolve().name if (Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").resolve().name.split('.')[-1] != 'loadout' else '.'.join((Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").resolve().name.split('.')[:-1:])) if (Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").exists() and  (Path(Defaults.DD["LOADOUTDIR"])/".ACTIVE.loadout").resolve().is_file() else None
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"ddconf.dd104.get_active_ld: Error: {str(e)}")
		return f"Ошибка: {str(e)}"


def list_ld() -> list:
	# lists loadout IDs !!!
	return ['.'.join(x.split('.')[:-1:]) for x in listdir(Defaults.DD["LOADOUTDIR"]) if (Path(Defaults.DD["LOADOUTDIR"])/x).is_file() and (Path(Defaults.DD["LOADOUTDIR"])/x).name.split('.')[-1] == 'loadout' and (Path(Defaults.DD["LOADOUTDIR"])/x).name != ".ACTIVE.loadout"]
	# return ["a", "b", "ne b"]


def process_handle(PID: int, OP:str) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		if type(PID) == int or type(PID) == str:
			std = subprocess.run(f'systemctl {OP} {"dd104client" if _mode == "tx" else "dd104server"}{PID}.service'.split(), text=True, capture_output=True)
			if std.stderr:
				raise RuntimeError(std.stderr)
			return get_status(PID)
		else:
			raise TypeError(f"ddconf.dd104.process_handle: PID must be a single instance of int, str, got {type(PID)}.")
	except RuntimeError:
		return -1
	except Exception as e:
		syslog.syslog(syslog.LOG_WARNING, f"dd104.{OP}: {str(e)}")
		return -2

#TODO
def get_logs(PID: str, LEN: int):
	try:
		if PID.lower() == "syslog":
			if LEN:
				LOGS = subprocess.run(f"tail -n {LEN} /var/log/syslog".split(), capture_output=True, text=True).stdout.strip()
			else:
				LOGS = subprocess.run(f"cat /var/log/syslog".split(), capture_output=True, text=True).stdout.strip()
			
		elif "dd104" in PID[0:5:]:
			lines=[x.strip() for x in subprocess.run(f"systemctl status {PID}".split(), capture_output=True, text=True).stdout.strip().split('\n') if PID in x]
				
			if not lines: 
				raise RuntimeError("dd104.get_logs: lines is empty!")
			
			if LEN:
				
				if len(lines) <= LEN:
					LOGS="\n".join(lines)
				else:
					LOGS='\n'.join(lines[-1*LEN::])
				
			else:
				LOGS="\n".join(lines)
			
		elif int(PID):
			lines=[x.strip() for x in subprocess.run(f"systemctl status dd104{'server' if _mode=='tx' else 'client'}{PID}".split(), capture_output=True, text=True).stdout.strip().split('\n') if f"dd104{'server' if _mode=='tx' else 'client'}{PID}" in x]
				
			if not lines: 
				raise RuntimeError("dd104.get_logs: lines is empty!")
			
			if LEN:
				
				if len(lines) <= LEN:
					LOGS="\n".join(lines)
				else:
					LOGS='\n'.join(lines[-1*LEN::])
				
			else:
				LOGS="\n".join(lines)
		else:
			raise ValueError(f"ddconf.dd104.get_logs: PID={PID} was not 'syslog', 'dd104*', or a number.")
	except Exception as e:
		syslog.syslog(syslog.LOG_ERR, f"ddconf.dd104.get_logs: {str(e)}")
		print(f"ddconf.dd104.get_logs: {traceback.print_exception(e)}")
		return {'error':f"ddconf.dd104.get_logs: error handling {PID} {traceback.print_exception(e)}"}
	else:
		return {"pid": PID, "logs":LOGS}


