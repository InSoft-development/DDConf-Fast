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
	config: DD104Defaults | OPCUADefaults


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


# class MainDefaults(BaseModel):
# 	
# 	opcua: Optional[OPCUADefaults] = None
# 	dd104: Optional[DD104Defaults] = None
# 	ddcs: DDCSDefaults

