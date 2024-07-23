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


def validate_numbers(lines:list) -> bool:
	# 1;ns=2;s=TEST_SIG.AI_SIGNAL_000;1000;1
	# numbers = [f'{i}' for i in range(0,10)]
	try:
		for line in lines:
			if int(line.split(';')[0]):
				if not _pl + 1 == int(line.split(';')[0]):
					return False
		return True
		
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"opcua.validate_numbers: {str(e)}, traceback: {traceback.format_exc().strip().split('\n')[1::]}")
		raise RuntimeError(e)

def parse_subs(subs:list) -> dict:
	try:
		
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f"opcua.parse_subs: {str(e)}, traceback: {traceback.format_exc().strip().split('\n')[1::]}")
		return {"result":None, "error":f"opcua.parse_subs: {str(e)}, traceback: {traceback.format_exc().strip().split('\n')[1::]}"}
