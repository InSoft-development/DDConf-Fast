import syslog, subprocess, time, tarfile, json, netifaces
from shutil import move, copy2, unpack_archive, make_archive
from pathlib import Path
from random import randrange
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir


def fetch_net() -> dict:
	# {'mac':'', 'ip':'', 'status':''}
	try:
		data = []
		sub = {}
		for name in netifaces.interfaces():
			iface = subprocess.run(f"ip a show {name}".split(), text=True, capture_output=True).stdout.strip().split('\n')
			for line in iface:
				if f"{name}:" in line:
					sub['status'] = line.split(' ')[8]
				elif "link/" in line:
					sub['mac'] = line.split(' ')[1]
				elif "inet " in line:
					sub['ip'] = line.split(' ')[1]
			if "ip" not in sub:
				sub['ip'] = None
			data.append(sub)
			sub = {}
		return {"result": data, "error": None}
	except Exception as e:
		msg = f"DDConf.dashboard.fetch_net: Error: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		return { "result": None, "error": msg }

def fetch_initial() -> dict: # fetch s/n and license
	try:
		data = {'serial': Path('/opt/serialnumber.txt').read_text(), "license": Path('/etc/dd/license').read_text()}
		return {'result': data, "error": None}
	except Exception as e:
		msg = f"DDConf.dashboard.fetch_initial: Error: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		return { "result": None, "error": msg }

def fetch_protocols() -> list:
	#[{'name': "", "link": ""}, ...]
	try:
		data = [{"name":x['name'], "link": x['link']} for x in json.loads(Path("/etc/dd/DDConf.json").read_text())['ddconf']['protocols']]
		return {"result":data, "error":None}
	except Exception as e:
		msg = f"DDConf.dashboard.fetch_protocols: Error: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		return { "result": None, "error": msg }
