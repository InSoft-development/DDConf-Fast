import syslog, subprocess, time, json, traceback, re
from shutil import move, copy2
from pathlib import Path
from os.path import exists, sep, isdir, isfile, join
from os import W_OK, R_OK, access, makedirs, listdir
from psutil import net_io_counters, net_if_addrs
from netifaces import gateways


def get_nics() -> list:
	return net_if_addrs().keys()


def fetch_device(_id: str) -> dict:
	
	io = net_io_counters(pernic=True)
	
	data = {
		'device': _id,
		"uptime": ,
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
		# "protocol": ,
		#"uponboot": #dispatcher
	}
	
	nics = nicfind('family', 2, net_if_addrs()[_id])
	
	for nic in nics:
		data['ipv4'].append({
			'address': nic.address,
			'netmask': nmtransform(nic.netmask),
			'gateway': gwfind(nic.address),
			'broadcast': nic.broadcast
		})
	
	#TODO


def nicfind(tgt, tgtv, arr) -> list:
	# 2 - ipv4, 10 - ipv6, 17 - link/packet
	data = []
	
	for i in arr:
		if (i.family if tgt == 'family' else i.address) == tgtv:
			data.append(i.address if tgt == 'family' else i.family)
		
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
	# gws = gateways()
	# for i in gws.keys():
	# 	if i != 'default':
	# 		if gws[i] 


def nmtransform(nm: str) -> str:
	# 255.255.255.0 -> 24
	return sum(bin(int(x)).count('1') for x in nm.split('.'))
