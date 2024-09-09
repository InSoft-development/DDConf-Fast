from fastapi import UploadFile
from pydantic import BaseModel
from typing import Union, Annotated
import syslog, json
from pathlib import Path
 
# class ProcessOperationTicket(BaseModel): #POT hehe
# 	PID: int
# 	OP: str


class POST(BaseModel):
	method: str
	params: dict | None | str #| UploadFile | Upload


class Upload(BaseModel):
	dest: str
	_file: UploadFile
	


class Defaults:
	RECVADDR = "192.168.100.10"
	DD = {
		"INIDIR" : '/etc/dd/dd104/configs/',
		#turned off by default, if the value is not-null, turn on archiving
		"ARCDIR" : None, #'/etc/dd/dd104/archive.d/'
		"LOADOUTDIR" : '/etc/dd/dd104/loadouts/'
	}
	OPCUA = {
		"INIDIR" : '/etc/dd/opcua/configs/',
		#turned off by default, if the value is not-null, turn on archiving
		"ARCDIR" : None, #'/etc/dd/dd104/archive.d/'
		"LOADOUTDIR" : '/etc/dd/opcua/loadouts/',
		"CERT" : "",
		"PKEY" : ""
	}
	
	def __init__(self, confile = "/etc/dd/DDConf.json"):
		try:
			self.DEFAULTS_FILE = confile
			conf = json.loads(Path(self.DEFAULTS_FILE).read_text())
			self.RECVADDR = conf['recvaddr'] if 'recvaddr' in conf and conf['recvaddr'] else "192.168.100.10"
			
			conf = json.loads(Path(self.DEFAULTS_FILE).read_text())['dd104']
			self.DD["INIDIR"] = conf['confdir'] if 'confdir' in conf and conf['confdir'] else '/etc/dd/dd104/configs/'
			self.DD["ARCDIR"] = conf['archdir'] if 'archdir' in conf and conf['archdir'] else None 
			self.DD["LOADOUTDIR"] = conf['loadoutdir'] if 'loadoutdir' in conf and conf['loadoutdir'] else '/etc/dd/dd104/loadouts/'
			
			conf = json.loads(Path(self.DEFAULTS_FILE).read_text())['opcua']
			self.OPCUA["INIDIR"] = conf['confdir'] if 'confdir' in conf and conf['confdir'] else '/etc/dd/opcua/configs/'
			self.OPCUA["ARCDIR"] = conf['archdir'] if 'archdir' in conf and conf['archdir'] else None 
			self.OPCUA["CERTDIR"] = conf['certpath'] if 'certpath' in conf and conf['certpath'] else None 
			self.OPCUA["PKDIR"] = conf['pkpath'] if 'pkpath' in conf and conf['pkpath'] else None 
		
		except Exception as e:
			msg = f"ddconf.models.defaults: failed to init defaults, details: {str(e)}"
			syslog.syslog(syslog.LOG_CRIT, msg)
			raise RuntimeError(msg) from e
