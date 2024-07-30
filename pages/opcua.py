import syslog, subprocess, time, tarfile, json, traceback, re
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


def validate_url(url:str) -> str:
	regex = re.compile(
		r'^(?:http|ftp)s?://' # http:// or https://
		r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
		r'localhost|' #localhost...
		r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
		r'(?::\d+)?' # optional port
		r'([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|'          # 1:2:3:4:5:6:7:8
		r'([0-9a-fA-F]{1,4}:){1,7}:|'                         # 1::                              1:2:3:4:5:6:7::
		r'([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|'         # 1::8             1:2:3:4:5:6::8  1:2:3:4:5:6::8
		r'([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|'  # 1::7:8           1:2:3:4:5::7:8  1:2:3:4:5::8
		r'([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|'  # 1::6:7:8         1:2:3:4::6:7:8  1:2:3:4::8
		r'([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|'  # 1::5:6:7:8       1:2:3::5:6:7:8  1:2:3::8
		r'([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|'  # 1::4:5:6:7:8     1:2::4:5:6:7:8  1:2::8
		r'[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|'       # 1::3:4:5:6:7:8   1::3:4:5:6:7:8  1::8  
		r':((:[0-9a-fA-F]{1,4}){1,7}|:)|'                     # ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8 ::8       ::     
		r'fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|'     # fe80::7:8%eth0   fe80::7:8%1     (link-local IPv6 addresses with zone index)
		r'::(ffff(:0{1,4}){0,1}:){0,1}'
		r'((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}'
		r'(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|'          # ::255.255.255.255   ::ffff:255.255.255.255  ::ffff:0:255.255.255.255  r'(IPv4-mapped IPv6 addresses and IPv4-translated addresses)
		r'([0-9a-fA-F]{1,4}:){1,4}:'
		r'((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}'
		r'(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])'           # 2001:db8:3:4::192.0.2.33  64:ff9b::192.0.2.33 (IPv4-Embedded IPv6 Address)
		r'(?:/?|[/?]\S+)$', re.IGNORECASE)
	
	if 'opc.tcp://' in url:
		url = url.strip()[10::]
	
	
	hostflag = False
	try:
		lines = Path("/etc/hosts").read_text().strip().split('\n')
		for line in lines:
			if ':' in url:
				url = url.split(':')[0]
			if url in line:
				if not ('#' in line and line.index('#')<line.index('url')):  
					hostflag = True
	except Exception:
		pass
	
	return "opc.tcp://"+url if re.match(regex, url) or hostflag else None
	


def make_file(data: dict, fname="/etc/dd/opcua/config.ini") -> str:
	#TODO
	return "success"


def fetch_file(path=f"/etc/dd/opcua/ddOPCUA{'server' if _mode == 'rx' else 'client'}.ini") -> dict:
	#TODO
	
	try:
		data = {"restore":None, "servers": [], "servers_len":None}
		if Path(path).is_file():
			cont = Path(path).read_text().strip().split('\n')
			block = ""
			sercount = -1
			subcount = -1
			for line in cont:
				if line:
					if '#' in line:
						line = line[0:line.index('#'):]
					if 'receiver' in line:
						block = "receiver"
					elif "server" in line:
						sercount += 1
						block = "server"
						data["servers"].append(dict())
					elif "subscription" in line:
						subcount += 1
						block = "subscription"
						if "subscriptions" not in data["servers"][sercount].keys():
							data["servers"][sercount]["subscriptions"] = []
						data["servers"][sercount]["subscriptions"].append(dict)
					
					if block == "receiver":
						if "restore" in line:
							data["restore"] = bool(int(line.split('=')[1]))
					elif block == "server":
						if "id" in line:
							data["servers"][sercount]["id"] = line.split('=')[1]
						elif "url1" in line:
							data["servers"][sercount]["main"] = validate_url(line.split("=")[1])
						
						elif "url2" in line:
							data["servers"][sercount]["second"] = validate_url(line.split("=")[1])
						
						elif "usertokentype" in line:
							data["servers"][sercount]["utoken_type"] = line.split('=')[1]
							data["servers"][sercount]["utoken_data"] = None if line.split('=')[1] == "anonymous" else {}
						
						elif "username" in line:
							data["servers"][sercount]["utoken_data"]["username"] = line.split("=")[1]
						
						elif "password" in line:
							data["servers"][sercount]["utoken_data"]["password"] = line.split("=")[1]
						
						#TODO certs should be files
# 						elif "certificate" in line:
# 							data["servers"][sercount]["utoken_data"]["cert"] = line.split("=")[1]
# 						
# 						elif "privatekey" in line:
# 							data["servers"][sercount]["utoken_data"]["pkey"] = line.split("=")[1]
						
						elif "secpolicy" in line:
							data["servers"][sercount]["secpolicy"] = line.split("=")[1]
						
						elif "mesmode" in line:
							data["servers"][sercount]["mesmode"] = line.split("=")[1]
						
					elif block == "subscription":
						
						if "id" in line:
							data["servers"][sercount]["subscriptions"][subcount]["id"] = line.split("=")[1]
						
						if "interval" in line:
							data["servers"][sercount]["subscriptions"][subcount]["interval"] = line.split("=")[1]
						
						if "items" in line:
							block = "items"
							data["servers"][sercount]["subscriptions"][subcount]["items"] = []
					
					elif block == "items":
						data["servers"][sercount]["subscriptions"][subcount]["items"].append(line)
						
				
				
	except Exception as e:
		msg = f"DDConf.opcua.fetch_file: error fetching file ({}); details: \n{traceback.format_exc()}\n"
		syslog.syslog(syslog.LOG_ERR, msg)
		print(msg)
		raise RuntimeError(e)
	else:
		
		return data
