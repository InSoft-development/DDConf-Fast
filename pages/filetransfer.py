import syslog, subprocess, time, json, traceback, re, struct
from shutil import move, copy2
from pathlib import Path
from os import W_OK, R_OK, access, makedirs, listdir
from psutil import net_io_counters, net_if_addrs
from netifaces import gateways
from socket import inet_ntoa, inet_aton

from models import DD104Defaults
# Globals
pdef = json.loads(Path("/etc/dd/DDConf.json").read_text())
_mode = pdef['mode']

DEFAULTS = DD104Defaults(**next(x['config'] for x in pdef['protocols'] if x['name']=='dd104')) 
# /Globals

def save_file():
	
