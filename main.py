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
import sqlite3, json

from pages.router import router as router_pages
import pages.dd104 as DD104
import pages.dashboard as Dashboard
import pages.login as Login
import models as Models
# env = Environment(
#     loader=FileSystemLoader('./templates'),
#     autoescape=select_autoescape(['html', 'xml'])
# )





@asynccontextmanager
async def lifespan(app: FastAPI):
	# startup
	pass
	yield
	# shutdown
	pass



pwd_context = Login.pwd_context
oauth2_scheme = Login.oauth2_scheme

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


@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),) -> Token:
	return Login.login_for_access_token(form_data)

@app.get("/")
async def name(request: Request):
	dashboard_data = DD104.get_processes(DD104.get_active_ld())
	return templates.TemplateResponse("dashboard.html", {"request": request, "dashboard_data": dashboard_data})

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

@app.get("/dd104/")
async def render_104(request: Request):
	data = {}
	data["active"] = {"name":DD104.get_active_ld(), "proc_data" : DD104.get_processes(DD104.get_active_ld()), "stat_list":[]}
	data["loadout_names"] = DD104.list_ld()
	for i in range(0, len(data["active"]["proc_data"])):
		data["active"]["stat_list"].append(DD104.get_status(i))
	
	if not data["active"]["stat_list"]:
		data["active"]["stat_list"] = None
	
	print(f"/dd104/: {data}")
	
	return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request, "dd104_data": json.dumps(data)})


@app.post("/dd104/processhandle/")
async def dd104_process_handler(Ticket: Models.ProcessOperationTicket):
	try:
		return DD104.process_handle(Ticket.PID, Ticket.OP)
	except Exception as e:
		syslog.syslog(syslog.LOG_ERR, f"main.dd104_process_handler: Error: {str(e)}")
		return -2
