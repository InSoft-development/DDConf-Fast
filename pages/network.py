import syslog, subprocess, time, json, traceback, re
from shutil import move, copy2
from pathlib import Path
from os import W_OK, R_OK, access, makedirs, listdir
from psutil import net_io_counters, net_if_addrs
from netifaces import gateways


def get_nics() -> list:
	return list(net_if_addrs().keys())


def fetch_device(_id: str) -> dict:
	#_id = 'eth0', not 'eth0.network'
	try:
		io = net_io_counters(pernic=True)
		netfile = [x for x in listdir('/etc/systemd/network/') if Path(f'/etc/systemd/network/{x}').is_file() and 'network' in x and _id in x]
		
		if netfile and _id in io:
			nicstat = Path(f'/sys/class/net/{_id}/operstate').read_text().strip() != 'down'
			if nicstat:
				devupt = float(Path('/proc/uptime').read_text().strip('\n').split()[0])
				dmesgupt = float(subprocess.getoutput(f'dmesg | grep "{_id}: Link is Up"').split(']')[0][1::].strip())
			
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
				"protocol": subprocess.run(f"grep DHCP /etc/systemd/network/{netfile[0]}".split(), capture_output=True, text=True).stdout,
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

#TODO broadcast?
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
		
		if data['device'] in get_nics():
			msg = f'''[Match]
Name={data['device']}

[Network]
'''
			if data['protocol']:
				msg = msg + "DHCP=yes\n"
			else:
				for ip in data['ipv4']:
					msg = msg + f'''Address={ip['address']}/{ip['netmask']}
Gateway={ip['gateway']}

'''
				stat = subprocess.run(f"ip addr add {ip['address']}/{ip['netmask']} brd + dev {data['device']}", capture_output=True, text=True)
				if stat.stderr:
					errors.append(f"error editing {data['device']}: couldn't set ip {ip} broadcast! details: {stat.stderr}")
			
			Path(f'/etc/systemd/network/80-{data["device"]}.network').write_text(msg)
			
			
		else:
			raise KeyError(f"ddconf.network.save_device: invalid NIC id: {data['device']}, aborting.") 
		
		
		
	except Exception as e:
		Path('/home/txhost/.EOUTS/network').write_text(traceback.format_exception(e))
		raise e
	else:
		if errors:
			Path('/home/txhost/.EOUTS/network').write_text(errors) 
		return {'result':'success' if not errors else None, 'error': errors if errors else None}
	


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
