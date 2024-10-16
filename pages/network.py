import syslog, subprocess, time, json, traceback, re, struct
from shutil import move, copy2
from pathlib import Path
from os import W_OK, R_OK, access, makedirs, listdir
from psutil import net_io_counters, net_if_addrs
from netifaces import gateways
from socket import inet_ntoa, inet_aton


#TODO daemon-reload, restart networkd, restart resolved




def get_nics() -> list:
	return [x for x in net_if_addrs().keys() if x != 'lo']


def fetch_device(_id: str) -> dict:
	#_id = 'eth0', not 'eth0.network'
	try:
		io = {k:v for k, v in net_io_counters(pernic=True).items() if k!='lo'}
		netfile = [x for x in listdir('/etc/systemd/network/') if Path(f'/etc/systemd/network/{x}').is_file() and 'network' in x and _id in x]
		
		if netfile and _id in io: #WARNING: if someone renames loopback from 'lo' we're fucked
			nicstat = Path(f'/sys/class/net/{_id}/operstate').read_text().strip() != 'down'
			if nicstat:
				devupt = float(Path('/proc/uptime').read_text().strip('\n').split()[0])
				dmesgupt = float(subprocess.getoutput(f'dmesg | grep "{_id}: Link is Up"').split(']')[0][1::].strip())
			
			proto = subprocess.run(f"grep DHCP /etc/systemd/network/{netfile[0]}".split(), capture_output=True, text=True).stdout
			
			data = {
				'device': _id,
				"status": nicstat,
				"uptime": devupt - dmesgupt if nicstat else None,
				"mac": nicfind('family', 17, net_if_addrs()[_id])[0].address,
				"rx": bytes2human(io[_id].bytes_recv),
				"tx": bytes2human(io[_id].bytes_sent),
				"ipv4": [
					# {
					# 	"address": ,
					# 	"netmask": ,
					# 	"gateway": ,
					# 	"broadcast": ,
					# }
				],
				"protocol": 'dynamic' if proto and proto.strip('\n').split('=')[1] == 'yes' else 'static',
				#"uponboot": #dispatcher
			}
			
			ips = nicfind('family', 2, net_if_addrs()[_id])
			
			for ip in ips:
				data['ipv4'].append({
					'address': ip.address,
					'netmask': nmtransform(ip.netmask),
					'gateway': gwfind(_id),
					'broadcast': ip.broadcast
				})
			
			#TODO dispatcher up on boot
			data['uponboot'] = True
		else:
			raise ValueError(f"ddconf.network.fetch_device: device {_id} not found!")
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e
	else:
		return data


def save_device(data: dict):
	
	try:
		''' 
		change:
			mac: ip link set eno1 address XX:XX:XX:XX:XX:XX -> no change
			ipv4: /etc/systemd/network/80-*.network
			protocol: see ipv4
			uponboot: wtf/dispatcher
		'''
		errors = [] 
		
		if validate_devdata(data):
			msg = f'''[Match]
Name={data['id']}

[Network]
'''
			if data['protocol'] == 'dynamic':
				msg = msg + f"DHCP=yes\n"
			else:
				for ip in data['ipv4']:
					msg = msg + f'''Address={ip['address']}
Netmask={nmdetransform(int(ip['netmask']))}
Gateway={ip['gateway']}

'''
				#broadcast
				stat = subprocess.run(f"ip addr add brd {ip['broadcast']} dev {data['id']}".split(), capture_output=True, text=True)
				if stat.stderr:
					errors.append(f"error editing {data['id']}: couldn't set ip {ip} broadcast! details: {stat.stderr}")
			
			Path(f'/etc/systemd/network/80-{data["id"]}.network').write_text(msg)
			
			stat = subprocess.run(f"systemctl daemon-reload".split(), capture_output=True, text=True)
			if stat.stderr:
				errors.append(f"error editing {data['id']}: systemctl daemon-reload returned an error! details: {stat.stderr}")
			stat = subprocess.run(f"systemctl restart systemd-networkd".split(), capture_output=True, text=True)
			if stat.stderr:
				errors.append(f"error editing {data['id']}: restarting systemd-networkd returned an error! details: {stat.stderr}")
			stat = subprocess.run(f"systemctl restart systemd-resolved".split(), capture_output=True, text=True)
			if stat.stderr:
				errors.append(f"error editing {data['id']}: restarting systemd-resolved returned an error! details: {stat.stderr}")
			
			
		else:
			raise KeyError(f"ddconf.network.save_device: invalid data received: {data}, aborting.") 
		
		
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e
	else:
		if errors:
			Path('/home/txhost/.EOUTS/network').write_text(errors)
		return {'result':'success' if not errors else None, 'error': errors if errors else None}


def validate_devdata(data: dict) -> bool:
	
	try:
		
		for k,v in data.items():
			if k == 'id':
				if not data['id'] or data['id'] not in get_nics():
					return False
			elif k == 'ipv4':
				if v:
					for i in v:
						for _k, _v in v:
							if _k == 'address' or _k == 'gateway' or _k == 'broadcast':
								_ = inet_aton(v)
							elif _k == 'netmask':
								if type(_v) == int:
									_ = nmdetransform(_v)
								elif type(_v) == str:
									_ = nmtransform(_v)
							else:
								return False
			elif k == 'protocol':
				if v != 'static' and v != 'dynamic':
					return False
			else:
				return False
		
	except Exception:
		return False
	else:
		return True


def nic_op(_id: str, op: str):
	try:
		if op not in ['up','down']:
			raise ValueError(f"Invalid operation: {op}")
		if _id not in get_nics():
			raise ValueError(f"Invalid NIC: {_id}")
		stat = subprocess.run(f"ip link set dev {_id} {op}".split(), capture_output=True, text=True)
		if stat.stderr:
			raise RuntimeError(f"Couldn't bring {op} iface {_id}: {stat.stderr}")
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e


def process_op(op: str):
	try:
		if not op in ['start','stop','restart']:
			raise ValueError(f"Invalid operation: {op}")
		stat = subprocess.run(f"systemctl {op} systemd-networkd.service".split(), capture_output=True, text=True)
		if stat.stderr:
			raise RuntimeError(f"Couldn't {op} systemd-networkd: {stat.stderr}")
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e


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
	return output


def netd_status():
	# status table: 0 == stopped, 1 == ok, 2 == starting, -1 == fail, -2 == anything else/error
	try:
		stat = subprocess.run(f"systemctl status systemd-networkd.service".split(), capture_output=True, text=True)
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
			msg = f"ddconf.network.netd_status: Ошибка: Парсинг статуса systemd-networkd передал пустой результат"
			syslog.syslog(syslog.LOG_ERR, msg)
			return -2#f"Критическая ошибка"
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		return -2#f"Критическая ошибка"


def nicfind(tgt, tgtv, arr) -> list: 
	# returns a list of families or addresses
	# 2 - ipv4, 10 - ipv6, 17 - link/packet
	data = []
	
	for i in arr:
		if (i.family if tgt == 'family' else i.address) == tgtv:
			# data.append(i.address if tgt == 'family' else i.family)
			data.append(i)
		
	return data


def bytes2human(n):
	# >>> bytes2human(10000)
	# '9.8K'
	# >>> bytes2human(100001221)
	# '95.4M'
	symbols = ('K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y')
	prefix = {}
	for i, s in enumerate(symbols):
		prefix[s] = 1 << (i + 1) * 10
	for s in reversed(symbols):
		if abs(n) >= prefix[s]:
			value = float(n) / prefix[s]
			return '%.1f%s' % (value, s)
	return "%sB" % n


def gwfind(_id: str) -> str:
	#TODO
	gws = gateways()
	for i in gws[2]:
		if i[1] == _id:
			return i[0]
	return "-"


def nmtransform(nm: str) -> str:
	# 255.255.255.0 -> 24
	return sum(bin(int(x)).count('1') for x in nm.split('.'))


def nmdetransform(nm:int):
	# 24 -> 255.255.255.0
	host_bits = 32 - int(nm)
	return inet_ntoa(struct.pack('!I', (1 << 32) - (1 << host_bits)))

