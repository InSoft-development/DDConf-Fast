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

def _archive_d(filepath:str, location=DEFAULTS.OPCUA["ARCDIR"]):
	if exists(filepath):
		if not isdir(location):
			makedirs(location)
		
		try:
			filename = Path(filepath).name if Path(filepath).name.count('.') == 1 else Path(filepath).name.replace('.','_') #filepath.split('/')[-1].split('.')
			rtime = time.localtime(time.time())
			utime = f"{rtime.tm_year}-{rtime.tm_mon}-{rtime.tm_mday}-{rtime.tm_hour}-{rtime.tm_min}-{rtime.tm_sec}"
			copy2(filepath, f"{location}/{filename[:-4:]}-{utime}.{filename[-3::]}")
		except Exception as e:
			syslog.syslog(syslog.LOG_CRIT, f"opcua: провал при создании архивного файла конфигурации, операция не может быть продолжена.")
			raise e
		
	else:
		msg = f"opcua: провал при архивации файла конфигурации ({filepath}), файл конфигурации отсутствует или недоступен, операция не может быть продолжена."
		syslog.syslog(syslog.LOG_CRIT, msg)
		raise RuntimeError(msg)


def rm_inis():
	try:
		dest = Path(DEFAULTS.INIDIR)
		for ini in listdir(dest):
			(dest/ini).unlink()
			syslog.syslog(syslog.LOG_INFO, f"opcua.rm_inis: {str(dest/ini)} file was removed")
			print(f"opcua.rm_inis: {str(dest/ini)} file was removed")
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"opcua.rm_inis: Error while removing existing inis from {dest}:  {str(e)}")
		print(f"opcua.rm_inis: Error while removing existing inis from {dest}:  {traceback.print_exception(e)}\n")


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
				msg = f"# Файл сгенерирован Сервисом Конфигурации Диода Данных;\n# comment: {proc['comment']}\nreceiver\naddress={DEFAULTS.RECVADDR}\n\nserver\naddress1={proc['main'].split(':')[0]}\nport1={proc['main'].split(':')[1]}"
				if proc['second']:
					msg = msg+f"\naddress2={proc['second'].split(':')[0]}\nport2={proc['second'].split(':')[1]}"
				
				(Path(DEFAULTS.INIDIR)/f"opcuaclient{COUNT}.ini").write_text(msg)
				syslog.syslog(syslog.LOG_INFO, f'opcua.create_inis: Created a file at {(str(Path(DEFAULTS.INIDIR)/"opcuaclient")+str(COUNT)+".ini")}. ')
				print(f'opcua.create_inis: Created a file at {(str(Path(DEFAULTS.INIDIR)/"opcuaclient")+str(COUNT)+".ini")}. ')
			else:
				raise ValueError(f"process {COUNT} data is invalid ({proc})")
	
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"opcua.create_inis: both main and second fields of proc are empty and/or invalid! Details:  {str(e)}\n")
		print(f"opcua.create_inis: both main and second fields of proc are empty and/or invalid! Details:  {traceback.print_exception(e)}\n")


def get_status(PID: int) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		data = subprocess.run(f"systemctl status {'opcuaclient' if _mode == 'tx' else 'opcuaserver'}{PID}".split(), capture_output=True, text=True)
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
		syslog.syslog(syslog.LOG_WARNING, f"opcua.status: {str(e)}")
		return -2
	# return randrange(-2, 3)


def save_ld(filename: str, data : dict) -> None:
	try:
		if not filename.split('.')[-1] == 'loadout':
			filename = filename+".loadout"
		(Path(OPCUA_Defaults.LOADOUTDIR)/filename).write_text(json.dumps(data))
		return "success"
	except Exception as e:
		msg = f"opcua.save_ld: an error occured: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		raise RuntimeError(msg)
		


def apply_ld(filename: str) -> None:
	try:
		if not filename.split('.')[-1] == 'loadout':
			filename = filename+".loadout"
		if (Path(OPCUA_Defaults.LOADOUTDIR)/filename).is_file():
			data = json.loads((Path(OPCUA_Defaults.LOADOUTDIR)/filename).read_text())
			if type(data) == list:
				rm_inis()
				create_inis(data)
			elif  type(data) == dict:
				rm_inis()
				create_inis([data])
			else:
				raise TypeError(f"Error while reading {filename}: data is corrupted or invalid, data type received ({type(data)}) is not in [list, dict]")
			return "success"
		else:
			raise FileNotFoundError(f"Attempted to apply {filename}; file doesn't exist or is unavailable.")
	except Exception as e:
		msg = f"opcua.apply_ld: an error occured: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		raise RuntimeError(msg)


def get_processes(LD_ID: str) -> list:
	# will return a list of dicts with fields "main", "secondary", "comment" 
	loadouts = [x for x in listdir(DEFAULTS.LOADOUTDIR) if (Path(DEFAULTS.LOADOUTDIR)/x).is_file() and (Path(DEFAULTS.LOADOUTDIR)/x).name.split('.')[-1] == 'loadout']
	ID = LD_ID if '.loadout' in LD_ID else LD_ID+'.loadout'
	if ID in loadouts:
		data = json.loads((Path(DEFAULTS.LOADOUTDIR)/ID).read_text())
		return data
	else:
		return None
	# return [{"main":"1.2.3.4", "second":"", "comment":"asdf"}, {"main":"3.4.5.6", "second":"2.3.4.5", "comment":"fdsa"}]


def get_active_ld() -> str:
	# returns the active ld ID (!!!)
	try:
		return ((Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().name if (Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().name.split('.')[-1] != 'loadout' else '.'.join((Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().name.split('.')[:-1:])) if (Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().is_file() else None
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"opcua.get_active_ld: Error: {str(e)}")
		return f"Ошибка: {str(e)}"


def list_ld() -> list:
	# lists loadout IDs !!!
	return [x for x in listdir(DEFAULTS.LOADOUTDIR) if (Path(DEFAULTS.LOADOUTDIR)/x).is_file() and (Path(DEFAULTS.LOADOUTDIR)/x).name.split('.')[-1] == 'loadout' and (Path(DEFAULTS.LOADOUTDIR)/x).name != ".ACTIVE.loadout"]
	# return ["a", "b", "ne b"]


def process_handle(PID: int, OP:str) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		if type(PID) == int or type(PID) == str:
			std = subprocess.run(f'systemctl {OP} {"opcuaclient" if _mode == "tx" else "opcuaserver"}{PID}.service'.split(), text=True, capture_output=True)
			if std.stderr:
				raise RuntimeError(std.stderr)
			return get_status(PID)
		else:
			raise TypeError(f"opcua.process_handle: PID must be a single instance or a list of int, str, got {type(PID)}.")
	except RuntimeError:
		return -1
	except Exception as e:
		syslog.syslog(syslog.LOG_WARNING, f"opcua.{OP}: {str(e)}")
		return -2

#TODO
def get_logs(PID: str, LEN: int):
	try:
		if PID.lower() == "syslog":
			if LEN:
				LOGS = subprocess.run(f"tail -n {LEN} /var/log/syslog".split(), capture_output=True, text=True).stdout.strip()
			else:
				LOGS = subprocess.run(f"cat /var/log/syslog".split(), capture_output=True, text=True).stdout.strip()
			
		elif "opcua" in PID[0:5:]:
			lines=[x.strip() for x in subprocess.run(f"systemctl status {PID}".split(), capture_output=True, text=True).stdout.strip().split('\n') if PID in x]
				
			if not lines: 
				raise RuntimeError("opcua.get_logs: lines is empty!")
			
			if LEN:
				
				if len(lines) <= LEN:
					LOGS="\n".join(lines)
				else:
					LOGS='\n'.join(lines[-1*LEN::])
				
			else:
				LOGS="\n".join(lines)
			
		elif int(PID):
			lines=[x.strip() for x in subprocess.run(f"systemctl status opcua{'server' if _mode='tx' else 'client'}{PID}".split(), capture_output=True, text=True).stdout.strip().split('\n') if f"opcua{'server' if _mode='tx' else 'client'}{PID}" in x]
				
			if not lines: 
				raise RuntimeError("opcua.get_logs: lines is empty!")
			
			if LEN:
				
				if len(lines) <= LEN:
					LOGS="\n".join(lines)
				else:
					LOGS='\n'.join(lines[-1*LEN::])
				
			else:
				LOGS="\n".join(lines)
		else:
			raise ValueError(f"opcua.get_logs: PID={PID} was not 'syslog', 'opcua*', or a number.")
	except Exception as e:
		syslog.syslog(syslog.LOG_ERR, f"opcua.get_logs: {str(e)}")
		print(f"opcua.get_logs: {traceback.print_exception(e)}")
		return {'error':f"opcua.get_logs: error handling {PID} {traceback.print_exception(e)}"}
	else:
		return {"pid": PID, "logs":LOGS}


