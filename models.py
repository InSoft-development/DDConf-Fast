from pydantic import BaseModel
from typing import Union, Annotated, Optional, List
import syslog, json
from pathlib import Path
 
# class ProcessOperationTicket(BaseModel): #POT hehe
# 	PID: int
# 	OP: str


class POST(BaseModel):
	method: str
	params: dict | None | str 


# class Upload(BaseModel):
# 	dest: str
# 	_file: UploadFile
# 	


class Token(BaseModel):
	access_token: str
	token_type: str


class TokenData(BaseModel):
	username: str | None = None


class User(BaseModel):
	username: str
	hashed_password: str
	level: str #'admin', 'user', 'disabled' TODO
	logged_in: Optional[bool] = False


# class UserInDB(User):
# 	hashed_password: str


class ProcDefaults(BaseModel):
	name: str
	title: str
	link: str
	service: str 
	bin: str


class DD104Defaults(BaseModel):
	recvaddr: str
	confdir: str | Path
	loadoutdir: str


class OPCUADefaults(BaseModel):
	base: str
	confdir: str | Path


class DDCSDefaults(BaseModel):
	host: str
	port: str | int
	mode: str
	protocols: List[ProcDefaults]


class MainDefaults(BaseModel):
	
	opcua: Optional[OPCUADefaults] = None
	dd104: Optional[DD104Defaults] = None
	ddcs: DDCSDefaults


class Defaults:
	RXADDR = "192.168.100.10"
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
		"BINBASE" : "/opt/dd/ddOPCUAclient/bin",
		"CERT" : f"",
		"PKEY" : f""
	}
	
	def __init__(self, confile = "/etc/dd/DDConf.json"):
		try:
			self.DEFAULTS_FILE = confile
			conf = json.loads(Path(self.DEFAULTS_FILE).read_text())
			self.RXADDR = conf['recvaddr'] if 'recvaddr' in conf and conf['recvaddr'] else "192.168.100.10"
			
			conf = json.loads(Path(self.DEFAULTS_FILE).read_text())['dd104']
			self.DD["INIDIR"] = conf['confdir'] if 'confdir' in conf and conf['confdir'] else '/etc/dd/dd104/configs/'
			self.DD["ARCDIR"] = conf['archdir'] if 'archdir' in conf and conf['archdir'] else None 
			self.DD["LOADOUTDIR"] = conf['loadoutdir'] if 'loadoutdir' in conf and conf['loadoutdir'] else '/etc/dd/dd104/loadouts/'
			
			conf = json.loads(Path(self.DEFAULTS_FILE).read_text())['opcua']
			self.OPCUA["INIDIR"] = conf['confdir'] if 'confdir' in conf and conf['confdir'] else '/etc/dd/opcua/configs/'
			self.OPCUA["ARCDIR"] = conf['archdir'] if 'archdir' in conf and conf['archdir'] else None 
			self.OPCUA["BINBASE"] = conf['base'] if 'base' in conf and conf['base'] else "/opt/dd/ddOPCUAclient/bin" 
			self.OPCUA["CERT"] = self.OPCUA['BINBASE']+"/pki/user/certs/user.der"
			self.OPCUA["PKEY"] = self.OPCUA['BINBASE']+"/pki/user/private/user.pem" 
		
		except Exception as e:
			msg = f"ddconf.models.defaults: failed to init defaults, details: {str(e)}"
			syslog.syslog(syslog.LOG_CRIT, msg)
			raise RuntimeError(msg) from e
