import syslog, subprocess, time, tarfile
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


def read_from_file(_path: str) -> dict:
	# returns {"paircount":<0..2>, "pairs":[<str>, <str>], "comment":<str>}
	data = {"paircount":None, "pairs":[], "comment":None}
	try:
		lines = Path(_path).read_text().strip().split('\n')
		for line in lines:
			
	except Exception as e:
		


#TODO
def get_status(PID: int) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	return randrange(-2, 3)


#TODO
def get_processes(LD_ID: str) -> list:
	# will return a list of dicts with fields "main", "secondary", "comment" 
	return [{"main":"1.2.3.4", "second":"", "comment":"asdf"}, {"main":"3.4.5.6", "second":"2.3.4.5", "comment":"fdsa"}]


#TODO
def get_active_ld() -> str:
	# returns the active ld ID (!!!)
	return "placeholder"


#TODO
def list_ld() -> list:
	# lists loadout IDs !!!
	
	return ["a", "b", "ne b"]


#TODO
def stop(PID: int) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	return 1


#TODO
def start(PID: int) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	return 1


#TODO
def restart(PID: int) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	return 1


