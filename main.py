from typing import Union, Annotated
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse
from fastapi.templating import Jinja2Templates 
from fastapi.middleware.cors import CORSMiddleware
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings
import sqlite3, json

from pages.router import router as router_pages
import pages.dd104 as DD104
import pages.dashboard as Dashboard
import pages.login as Login
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
app.include_router(router_pages)

BASE_DIR = Path(__file__).parent
templates = Jinja2Templates(directory=[
	BASE_DIR / "templates",
])

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


app.mount("/static", StaticFiles(directory="static"), name="static")


# @app.post("/token")
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),) -> Token:
# 	return Login.login_for_access_token(form_data)


@app.post("/dd104")
def dd104_post(REQ: Models.POST) -> dict:
	try:
		data = {} #just in case
		errs = [] #just in case
		
		if REQ.method == "fetch_table":
			
			data = {}
			data["active"] = {"name":DD104.get_active_ld(), "proc_data" : DD104.get_processes(DD104.get_active_ld())}
			data["loadout_names"] = DD104.list_ld()
			for i in data["active"]["proc_data"]:
				i["status"] = DD104.get_status(i)
			
			print(f"/dd104/: {data}")
			
			
		
		elif REQ.method == "process_handle":
			
			if type(REQ.params['pid']) == list:
				
				data = []
				
				for pid in REQ.params['pid']:
					try:
						data.append({"pid": pid, "status": DD104.process_handle(pid, REQ.params["op"])})
					except Exception as e:
						errs.append(f"pid: {pid}, err: {str(e)}")
			
			elif type(REQ.params['pid']) == str or type(REQ.params['pid']) == int:
				
				data = {"status": DD104.process_handle(REQ.params['pid'], REQ.params["op"])}
				
			else:
				raise TypeError(f"process_handle: \"pid\" field must be str or list, got {type(REQ.params['pid'])}.")
			
		
		elif REQ.method == "profile_save": #TODO
			try:
				data = DD104.save_ld(REQ.params['filename'], REQ.params['data'])
			except Exception as e:
				msg = f"main.dd104_save_ld_handler: Error: {str(e)}"
				syslog.syslog(syslog.LOG_ERR, msg)
				data = None
				errs.append(msg)
			
		
		elif REQ.method == "profile_apply": #TODO
			try:
				if REQ.params['data']:
					try:
						data = DD104.save_ld(REQ.params['filename'], REQ.params['data'])
					except Exception as e:
						msg = f"main.dd104_apply_ld_handler.save: Error: {str(e)}"
						syslog.syslog(syslog.LOG_ERR, msg)
						data = None
						errs.append(msg)
					data = DD104.apply_ld(REQ.params['filename'])
			except Exception as e:
				msg = f"main.dd104_apply_ld_handler: Error: {str(e)}"
				syslog.syslog(syslog.LOG_ERR, msg)
				data = None
				errs.append(msg)
			
		
	except Exception as e:
		syslog.syslog(syslog.lOG_CRIT, f"DDConf.main.dd104_post: ERROR: {str(e)}")
		return {"result":None, "error":str(e)}
	else:
		return {"result": data, "error":None if not errs else errs}
