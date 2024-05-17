import syslog, subprocess, time, tarfile, json
from shutil import move, copy2, unpack_archive, make_archive
from pathlib import Path
from random import randrange
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir

# Globals
_mode = 'tx'
INIDIR = '/etc/dd/dd104/configs/'
ARCDIR = '/etc/dd/dd104/archive.d/'
LOADOUTDIR = '/etc/dd/dd104/loadouts.d/'
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
			syslog.syslog(syslog.LOG_CRIT, f"dd104: провал при создании архивного файла конфигурации, операция не может быть продолжена.")
			raise e
		
	else:
		msg = f"dd104: провал при архивации файла конфигурации ({filepath}), файл конфигурации отсутствует или недоступен, операция не может быть продолжена."
		syslog.syslog(syslog.LOG_CRIT, msg)
		raise RuntimeError(msg)

#TODO
def read_from_file(_path: str) -> dict:
	# returns {"paircount":<0..2>, "pairs":[<str>, <str>], "comment":<str>}
	data = {"paircount":None, "pairs":[{},{}], "comment":None}
	mode = _mode.lower()
	try:
		lines = [ x.strip() for x in Path(_path).read_text().split('\n') if not x == '']
	except FileNotFoundError:
		return {'count':-1}
	
	if len(lines)>1:
		block = 0
		IND = 0
		for line in lines:
			if line[0]=='#' and 'comment' in line:
				data['comment'] = line.strip().split('comment: ')[1]
			if 'receiver' in line:
				block = 1
			elif 'server' in line:
				block = 2
				IND = lines.index(line)
				break
			# else:
			# 	if block == 2:
			# 		if mode == 'rx':
			# 			if 'address' in line and not line[0] == '#':
			# 				data['old_addr'] = line.split('=')[1].strip()
			# 			elif 'port' in line and not line[0] == '#':
			# 				data['old_port'] = line.split('=')[1].strip()
			# 			elif 'queuesize' in line and not line[0] == '#':
			# 				data['old_queuesize'] = line.split('=')[1].strip()
			# 			elif 'mode' in line and not line[0] == '#':
			# 				data['old_mode'] = line.split('=')[1].strip()
		for i in range(IND, len(lines)):
			if "address" in lines[i] and not "#" == lines[i].strip()[0]:
				if lines[i].split("address")[1].split("=")[0]:
					if lines[i].split("address")[1].split("=")[0] == '1':
						data["pairs"][0]['address'] = lines[i].split('=')[1]
					elif lines[i].split("address")[1].split("=")[0] == '2':
						data["pairs"][1]['address'] = lines[i].split('=')[1]
				else:
					data["pairs"][0]['address'] = lines[i].split('=')[1]
				
		
		
		# if mode == 'tx':
		# 	#the 3 is for savename, savetime and recv
		# 	data['count'] = (len(data.keys()) - 3) //2
		# else:
		# 	data['count'] = 1
		
		return data
	else:
		return {'count':1, 'old_savename':'', 'old_savetime':'', 'old_recv_addr':''}
		



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
		syslog.syslog(syslog.LOG_WARNING, f"dd104.status: {str(e)}")
		return -2
	# return randrange(-2, 3)


#TODO test
def get_processes(LD_ID: str) -> list:
	# will return a list of dicts with fields "main", "secondary", "comment" 
	loadouts = [x for x in listdir(LOADOUTDIR) if (Path(LOADOUTDIR)/x).is_file() and (Path(LOADOUTDIR)/x).name.split('.')[-1] == 'loadout']
	ID = LD_ID if '.loadout' in LD_ID else LD_ID+'.loadout'
	if ID in loadouts:
		data = json.loads((Path(LOADOUTDIR)/ID).read_text())
		return data
	else:
		return None
	# return [{"main":"1.2.3.4", "second":"", "comment":"asdf"}, {"main":"3.4.5.6", "second":"2.3.4.5", "comment":"fdsa"}]


#TODO test
def get_active_ld() -> str:
	# returns the active ld ID (!!!)
	return (Path(LOADOUTDIR)/".ACTIVE.loadout").resolve().name if (Path(LOADOUTDIR)/".ACTIVE.loadout").resolve().name.split('.')[-1] != 'loadout' else '.'.join((Path(LOADOUTDIR)/".ACTIVE.loadout").resolve().name.split('.')[:-1:]) 
	# return "placeholder"


#TODO test
def list_ld() -> list:
	# lists loadout IDs !!!
	return [x for x in listdir(LOADOUTDIR) if (Path(LOADOUTDIR)/x).is_file() and (Path(LOADOUTDIR)/x).name.split('.')[-1] == 'loadout' and (Path(LOADOUTDIR)/x).name != ".ACTIVE.loadout"]
	# return ["a", "b", "ne b"]


def process_handle(PID:int, OP:str) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		std = subprocess.run(f'systemctl {OP} {"dd104client" if _mode == "tx" else "dd104server"}{PID}.service'.split(), text=True, capture_output=True)
		if std.stderr:
			raise RuntimeError(std.stderr)
		return get_status(PID)
	except RuntimeError:
		return -1
	except Exception as e:
		syslog.syslog(syslog.LOG_WARNING, f"dd104.{OP}: {str(e)}")
		return -2




