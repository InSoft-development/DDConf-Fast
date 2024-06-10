from typing import Union, Annotated
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse, FileResponse
from fastapi.templating import Jinja2Templates 
from fastapi.middleware.cors import CORSMiddleware
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings
import sqlite3, json

# from pages.router import router as router_pages
import pages.dd104 as DD104
import pages.dashboard as Dashboard
# import pages.login as Login
import models as Models





@asynccontextmanager
async def lifespan(app: FastAPI):
	# startup
	pass
	yield
	# shutdown
	pass



# pwd_context = Login.pwd_context
# oauth2_scheme = Login.oauth2_scheme

app = FastAPI(docs_url=None, redoc_url=None, lifespan=lifespan)
# app.include_router(router_pages)

BASE_DIR = Path(__file__).parent
# templates = Jinja2Templates(directory=[
# 	BASE_DIR / "static",
# ])

origins = [
	# "http://127.0.0.1:8080",
	# "https://127.0.0.1",
	# "http://localhost",
	# "http://localhost:8080",
	'*'
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


app.mount("/", StaticFiles(directory="static"), name="static")


# @app.post("/token")
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),) -> Token:
# 	return Login.login_for_access_token(form_data)


@app.post("/dashboard")
def dashboard_post(REQ: Models.POST) -> dict:
	try:
		data = {}
		errs = None
		if REQ.method == "fetch_initial":
			
			return Dashboard.fetch_initial()
			
		elif REQ.method == "fetch_net":
			
			return Dashboard.fetch_net()
			
		elif REQ.method == "fetch_protocols":
			
			return Dashboard.fetch_protocols()
			
		
	except Exception as e:
		msg = f"DDConf.dashboard_post: Error: {str(e)}"
		syslog.syslog(syslog.LOG_CRIT, msg)
		return {"result": None, "error": msg}


@app.get("/dd104", response_class=FileResponse)
def dd104_serve(REQ: Request):
	# templates = Jinja2Templates(directory="static/build")
	# return templates.TemplateResponse("index.html", {"request": REQ})
	return FileResponse('index.html')


@app.post("/dd104")
def dd104_post(REQ: Models.POST) -> dict:
	try:
		data = {} #just in case
		errs = None #just in case
		
		if REQ.method == "fetch_initial":
			
			data = {}
			data["active"] = {"name":DD104.get_active_ld(), "proc_data" : DD104.get_processes(DD104.get_active_ld())}
			data["loadout_names"] = DD104.list_ld()
			for i in data["active"]["proc_data"]:
				i["status"] = DD104.get_status(i)
			
			print(f"/dd104.fetch_initial: {data}")
			
			
		
		elif REQ.method == "process_handle":
			
			if REQ.params['op'] in ['start', 'stop', 'restart']:
				if type(REQ.params['pid']) == list:
					
					data = []
					errs = []
					
					for pid in REQ.params['pid']:
						try:
							data.append({"pid": pid, "status": DD104.process_handle(pid, REQ.params["op"])})
						except Exception as e:
							errs.append(f"pid: {pid}, err: {str(e)}")
				
				elif type(REQ.params['pid']) == str or type(REQ.params['pid']) == int:
					
					data = {"status": DD104.process_handle(REQ.params['pid'], REQ.params["op"])}
					
				else:
					raise TypeError(f"process_handle: \"pid\" field must be str or list, got {type(REQ.params['pid'])}.")
				
			else:
				raise ValueError(f"dd104.process_handle: incorrect operation keyword - {REQ.params['op']};")
		
		elif REQ.method == "profile_save": #TODO validation
			
			if REQ.params['name'] in DD104.list_ld():
				try:
					data = DD104.save_ld(REQ.params['name'], REQ.params['data'])
				except Exception as e:
					msg = f"main.dd104_save_ld_handler: Error: {str(e)}"
					syslog.syslog(syslog.LOG_ERR, msg)
					data = None
					errs.append(msg)
			else:
				errs = f"dd104.profile_apply: incorrect ld name; data: {REQ.params['name']}\n"
				data = None
		
		elif REQ.method == "profile_apply": #TODO validation
			
			if REQ.params['name'] in DD104.list_ld():
				try:
					data = DD104.apply_ld(REQ.params['name'])
				except Exception as e:
					msg = f"main.dd104_apply_ld_handler: Error: {str(e)}"
					syslog.syslog(syslog.LOG_ERR, msg)
					data = None
					errs.append(msg)
			else:
				errs = f"dd104.profile_apply: incorrect ld name; data: {REQ.params['name']}\n"
				data = None
		
		elif REQ.method == "fetch_ld":
			
			if REQ.params['name']:
				if REQ.params['name'] in DD104.list_ld():
					data = DD104.get_processes(REQ.params['name'])
					print(f"/dd104.fetch_ld({REQ.params['name']}): {data}")
				else:
					errs = f"dd104.fetch_ld: incorrect ld name; data: {REQ.params['name']}\n"
					data = None
			else:
				errs = f"dd104.fetch_ld: incorrect data: {REQ.params}\n"
				data = None
		
	except Exception as e:
		syslog.syslog(syslog.lOG_CRIT, f"DDConf.main.dd104_post: ERROR: {str(e)}")
		return {"result":None, "error":str(e)}
	else:
		return {"result": data, "error":None if not errs else errs}
