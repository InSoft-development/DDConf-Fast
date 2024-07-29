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
	try:
		for line in lines:
			if int(line.split(';')[0]):
				if not _pl + 1 == int(line.split(';')[0]):
					return False
		return True
		
	except Exception as e:
		tb = traceback.format_exc().strip().split('\n')[1::]
		syslog.syslog(syslog.LOG_CRIT, f"opcua.validate_numbers: {str(e)}, traceback: {tb}")
		raise RuntimeError(e)


def fix_numbers(lines: list, start: int) -> list:
	# 1;ns=2;s=TEST_SIG.AI_SIGNAL_000;1000;1
	
	for i in range(0, len(lines)+1):
		if int(lines[i].split(";")[0]) != start+i:
			lines[i] = f"{start+i};"+';'.join(lines[i].split(';')[1::])
	return lines


def parse_subs(subs:list) -> dict:
	'''
		"subscriptions": [
			{
				"interval": int,
				"items": string
			},
		]
	'''
	try:
		if subs:
			_lbi = 0 # last block index 
			for sub in subs:
				if type(sub["interval"]) != int or sub["interval"] < 0:
					sub["interval"] = 0
				
				if int(sub["items"][0].split(";")[0]) != _lbi + 1:
					#TODO
					raise ValueError(f'index out of order; LBI == {_lbi}, first line index == {int(sub["items"][-1].split(";")[0])} !')
				
				if not validate_numbers(sub["items"]):
					try:
						sub["items"] = fix_numbers(sub["items"], _lbi)
					except Exception as e:
						raise RuntimeError(f"Error fixing the sub items order; {str(e)}")
				
				_lbi = int(sub["items"][-1].split(";")[0])
		else:
			msg = "opcua.parse_subs: Error - received subs list is empty!"
			print(msg)
			# syslog.syslog(syslog.LOG_ERR, msg)
			raise ValueError(msg)
	except Exception as e:
		tb = traceback.format_exc().strip().split('\n')[1::]
		syslog.syslog(syslog.LOG_CRIT, f"opcua.parse_subs: {str(e)}, traceback: {tb}")
		return {"result":None, "error":f"opcua.parse_subs: {str(e)}, traceback: {tb}"}


def make_file(data: dict, fname="/etc/dd/opcua/config.ini":str) -> str:
	#TODO
	return "success"


def fetch_file(path=f"/etc/dd/opcua/ddOPCUA{'server' if _mode == 'rx' else 'client'}.ini": str) -> dict:
	#TODO
	
	try:
		if Path(path).is_file():
			cont = Path(path).read_text().strip().split('\n')
			block = ""
			sercount = -1
			subcount = -1
			for line in cont:
				if 'receiver' in line and line.strip()[0] != '#':
					block = "receiver"
				elif "server" in line and line.strip()[0] !='#':
					sercount += 1
					block = "server"
				elif "subscription" in line and line.strip()[0] != "#":
					subcount += 1
					block = "subscription"
			
	except Exception as e:
		msg = f"DDConf.opcua.fetch_file: error fetching file ({}); details: \n{traceback.format_exc()}\n"
		syslog.syslog(syslog.LOG_ERR, msg)
		print(msg)
		raise RuntimeError(e)
	else:
		
		return {"restore":True, "servers":[]}
