import syslog, subprocess, time, json, netifaces
from pathlib import Path
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir

# from DDConf-Fast.models import ProcDefaults

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
					sub['mac'] = line.strip().split(' ')[1]
				elif "inet " in line:
					sub['ip'] = line.strip().split(' ')[1]
			if "ip" not in sub:
				sub['ip'] = None
			data.append(sub)
			sub = {}
		return {"result": data, "error": None}
	except Exception as e:
		msg = f"ddconf.dashboard.fetch_net: Error: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		return { "result": None, "error": msg }


def fetch_initial() -> dict: # fetch s/n and license
	try:
		data = {'serial': Path('/opt/serialnumber.txt').read_text(), "license": Path('/etc/dd/license').read_text()}
		return {'result': data, "error": None}
	except Exception as e:
		msg = f"ddconf.dashboard.fetch_initial: Error: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		return { "result": None, "error": msg }


# def fetch_protocols() -> list:
# 	
# 	try:
# 		data = [{"name":x['name'], 'status':status(x['svcpath'])} for x in json.loads(Path("/etc/dd/DDConf.json").read_text())['ddconf']['protocols']]
# 		return {"result":data, "error":None}
# 	except Exception as e:
# 		msg = f"ddconf.dashboard.fetch_protocols: Error: {str(e)}"
# 		syslog.syslog(syslog.LOG_ERR, msg)
# 		return { "result": None, "error": msg }


def _statparse(data:str) -> dict:
	try:
		data = data.split('\n')
		output = {}
		line = data[1]
		i = 1
		while not line == '':
			line = data[i]
			if ': ' in line:
				output[line.split(': ')[0].strip(' ')] = ': '.join(line.split(': ')[1::])
			# else:
			# 	output['CGroup'] = f"{output['CGroup']}\n{line}"  
			i+=1
	except Exception as e:
		syslog.syslog(syslog.LOG_CRIT, f'ddconf.network.statparse: Ошибка при парсинге блока статуса сервиса, подробности:   {str(e)}  ')
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e
	else:
		return output


def proc_status(svc: str) -> int:
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		stat = subprocess.run(f"systemctl status {svc}".split(), capture_output=True, text=True)
		data = _statparse(stat.stdout)
		if data:
			if ("stopped" in data['Active'].lower() or 'dead' in data['Active'].lower()) and not 'failed' in data['Active'].lower():
				return 0#"Остановлен"
			elif "activating" in data['Active'].lower():
				return 2#f"Запускается"
			elif 'failed' in data['Active'].lower():
				return -1#f"Ошибка"
			elif "running" in data['Active'].lower():
				return 1#f"Запущен"
			else:
				raise RuntimeError(data)
		else:
			msg = f"ddconf.dashboard.status: Ошибка: Парсинг статуса {svc} передал пустой результат"
			syslog.syslog(syslog.LOG_ERR, msg)
			return -2#f"Критическая ошибка"
	except Exception as e:
		Path('/home/txhost/.EOUTS/dashboard').write_text(traceback.format_exception(e))
		return -2#f"Критическая ошибка"


def fetch_status(svc) -> dict:
	
	try:
		data = None
		if svc.name == 'opcua':
			
			data = [proc_status(svc.service)]
			
		elif svc.name == 'dd104':
			
			services = [x for x in listdir("/etc/systemd/system/") if x.service in x]
			
			data = [proc_status(x) for x in services]
		
		
		if not data: 
			raise RuntimeError(f"Data is empty! details: {svc}")
		
		
	except Exception as e:
		msg = f"ddconf.dashboard.fetch_status: Error: {str(e)}"
		syslog.syslog(syslog.LOG_ERR, msg)
		return { "result": None, "error": msg }
	else:
		return {"result": data, "error": None}
