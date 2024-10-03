import syslog, subprocess, time, json, traceback, re
from shutil import move, copy2
from pathlib import Path
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir
from psutil import net_io_counters, net_if_addrs
from netifaces import gateways

def get_nics() -> list:
	return list(net_if_addrs().keys())


def fetch_device(_id: str) -> dict:
	
	try:
		io = net_io_counters(pernic=True)
		netfile = [x for x in listdir('/etc/systemd/network/') if Path(f'/etc/systemd/network/{x}').is_file() and 'network' in x and _id in x]
		
		if netfile and _id in io:
			
			data = {
				'device': _id,
				# "uptime": ,
				"mac": nicfind('family', 17, net_if_addrs()[_id])[0],
				"rx": bytes2human(io[_id].bytes_recv),
				"tx": bytes2human(io[_id].bytes_sent),
				"ipv4": [
				# {
				# 	"address": ,
				# 	"netmask": ,
				# 	"gateway": ,
				# 	"broadcast": ,
				# }
				]
				"protocol": subprocess.run(f"grep DHCP /etc/systemd/network/{netfile[0]}".split(), capture_output=True, text=True).stdout(),
				#"uponboot": #dispatcher
			}
			
			nics = nicfind('family', 2, net_if_addrs()[_id])
			
			for nic in nics:
				data['ipv4'].append({
					'address': nic.address,
					'netmask': nmtransform(nic.netmask),
					'gateway': gwfind(_id),
					'broadcast': nic.broadcast
				})
			
			data = {**data, **fetch_status(_id)}
			#TODO dispatcher up on boot
			
		else:
			raise ValueError(f"ddconf.network.fetch_device: device {_id} not found!")
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e
	else:
		return data


def save_device(_id: str, data: dict):
	
	try:
		pass
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e
	else:
		return 'success'
	


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
