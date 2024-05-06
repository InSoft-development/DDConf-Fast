from typing import Union, Annotated
from fastapi import FastAPI, Depends, Request, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse
from fastapi.templating import Jinja2Templates 
from fastapi.middleware.cors import CORSMiddleware
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
import sqlite3

from pages.router import router as router_pages
import pages.dd104 as dd104
import pages.dashboard as dashboard
# env = Environment(
#     loader=FileSystemLoader('./templates'),
#     autoescape=select_autoescape(['html', 'xml'])
# )

app = FastAPI()
app.include_router(router_pages)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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



#TODO
def read_auth():
	with Path('./.auth/auth.conf').open().read_text() as F:
		pass

@app.get("/")
async def name(request: Request):
	dashboard_data = dd104.get_processes(dd104.get_active_ld())
	return templates.TemplateResponse("dashboard.html", {"request": request, "dashboard_data": dashboard_data})


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

@app.get("/dd104/")
async def render_104(request: Request):
	data = {}
	data["active"] = {"name":dd104.get_active_ld(), "proc_data" : dd104.get_processes(dd104.get_active_ld()), "stat_list":[]}
	data["loadout_names"] = dd104.list_ld()
	for i in range(0, len(data["active"]["proc_data"])):
		data["active"]["stat_list"].append(dd104.get_status(i))
	
	print(f"/dd104/: {data}")
	
	return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request, "dd104_data": data})

