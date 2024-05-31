from pydantic import BaseModel
from typing import Union, Annotated
import syslog, json
from pathlib import Path
 
# class ProcessOperationTicket(BaseModel): #POT hehe
# 	PID: int
# 	OP: str


class POST(BaseModel):
	method: str
	params: dict 


class DD104_Defaults:
	RECVADDR = "192.168.100.10"
	INIDIR = '/etc/dd/dd104/configs/'
	#turned off by default, if the value is not-null, turn on archiving
	ARCDIR = None #'/etc/dd/dd104/archive.d/'
	LOADOUTDIR = '/etc/dd/dd104/loadouts.d/'
	
	def __init__(self, confile = "/etc/dd/DDConf.json"):
		try:
			conf = json.loads(Path(confile).read_text())
			self.RECVADDR = conf['recvaddr'] if 'recvaddr' in conf and conf['recvaddr'] else "192.168.100.10"
			self.INIDIR = conf['confdir'] if 'confdir' in conf and conf['confdir'] else '/etc/dd/dd104/configs/'
			self.ARCDIR = conf['archdir'] if 'archdir' in conf and conf['archdir'] else None 
			self.LOADOUTDIR = conf['loadoutdir'] if 'loadoutdir' in conf and conf['loadoutdir'] else '/etc/dd/dd104/loadouts.d/'
			self.DEFAULTS_FILE = confile
		except Exception as e:
			msg = f"DDConf.defaults: failed to init defaults, details: {str(e)}"
			syslog.syslog(syslog.LOG_CRIT, msg)
			raise RuntimeError(msg) from e
