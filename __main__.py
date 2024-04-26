from typing import Union
from fastapi import FastAPI, Depends, FastAPI, HTTPException, status
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, PlainTextResponse
#from fastapi.templating import Jinja2Templates as J2T
from jinja2 import Environment, FileSystemLoader, select_autoescape
import sqlite3

env = Environment(
    loader=FileSystemLoader('./templates'),
    autoescape=select_autoescape(['html', 'xml'])
)

app = FastAPI()

# dashboard_data = {"active_protocols":{"DD104":"/pages/dd104", "OPC UA":"/pages/something", "SomeBullshit":"/pages/suckmydick"}, "license":"12321", "pac_num":"123123","network":[{"id":"1", "addr":"10.23.23.123", "macaddr":"eb:1a:b0:b1:cc", "status": "1"}, {"id":"2", "addr":"127.0.0.1", "macaddr":"eb:1a:b0:b1:c1", "status": "0"}]} # 0 = down, 1 = up

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/dashboard/")
def render_dash():
	pass
