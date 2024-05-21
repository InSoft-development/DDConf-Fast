import syslog, subprocess, time, tarfile, json
from shutil import move, copy2, unpack_archive, make_archive
from pathlib import Path
from random import randrange
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir

# Globals
_mode = 'tx'
class DEFAULTS:
	recvaddr = "192.168.100.10"
	DEFAULTS.INIDIR = '/etc/dd/dd104/configs/'
	DEFAULTS.ARCDIR = '/etc/dd/dd104/archive.d/'
	DEFAULTS.LOADOUTDIR = '/etc/dd/dd104/loadouts.d/'
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
def create_inis(data: dict):
	#gets loadout contents, creates an appropriate amount of inis
	try:
		for proc in data:
			if proc['main'] or proc['second']:
				if not proc['main']:
					proc['main'] = proc['second']
					proc['second'] = None
				msg = f"# Файл сгенерирован Сервисом Конфигурации Диода Данных;\n# comment: {proc['comment']}\nreceiver\naddress={DEFAULTS.recvaddr}\n\nserver\naddress1={proc['main'].split(':')[0]}\nport1={proc['main'].split(':')[1]}"
				if proc['second']:
					msg = msg+f"\naddress2={proc['second'].split(':')[0]}\nport2={proc['second'].split(':')[1]}"
				
				(Path(DEFAULTS.INIDIR)/f"dd104client{data.index(proc) + 1}.ini").write_text(msg)
					
			else:
				raise ValueError(f"process {data.index(proc) + 1} data is invalid ({proc})")
	
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"dd104.create_inis: both main and second fields of proc are empty and/or invalid! Details:  {str(e)}\n")


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
	loadouts = [x for x in listdir(DEFAULTS.LOADOUTDIR) if (Path(DEFAULTS.LOADOUTDIR)/x).is_file() and (Path(DEFAULTS.LOADOUTDIR)/x).name.split('.')[-1] == 'loadout']
	ID = LD_ID if '.loadout' in LD_ID else LD_ID+'.loadout'
	if ID in loadouts:
		data = json.loads((Path(DEFAULTS.LOADOUTDIR)/ID).read_text())
		return data
	else:
		return None
	# return [{"main":"1.2.3.4", "second":"", "comment":"asdf"}, {"main":"3.4.5.6", "second":"2.3.4.5", "comment":"fdsa"}]


#TODO test
def get_active_ld() -> str:
	# returns the active ld ID (!!!)
	return (Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().name if (Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().name.split('.')[-1] != 'loadout' else '.'.join((Path(DEFAULTS.LOADOUTDIR)/".ACTIVE.loadout").resolve().name.split('.')[:-1:]) 
	# return "placeholder"


#TODO test
def list_ld() -> list:
	# lists loadout IDs !!!
	return [x for x in listdir(DEFAULTS.LOADOUTDIR) if (Path(DEFAULTS.LOADOUTDIR)/x).is_file() and (Path(DEFAULTS.LOADOUTDIR)/x).name.split('.')[-1] == 'loadout' and (Path(DEFAULTS.LOADOUTDIR)/x).name != ".ACTIVE.loadout"]
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




