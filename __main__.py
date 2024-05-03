from typing import Union, Annotated
from fastapi import FastAPI, Depends, Request, HTTPException, status, Form
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, PlainTextResponse
from fastapi.templating import Jinja2Templates 
from jinja2 import Environment, FileSystemLoader, select_autoescape
from router.pages import router as router_pages
import sqlite3

from 
# env = Environment(
#     loader=FileSystemLoader('./templates'),
#     autoescape=select_autoescape(['html', 'xml'])
# )

app = FastAPI()
app.include_router(router_pages)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates("templates")



# dd104_data = {"active_ld":{"id":3, "processes":[{"id":1, "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":1}, {"id":2, "main":"10.23.23.123:54679", "second":"", "status":0}, {"id":3, "main":"sosat@kusat", "second":"", "status":-1}]}, "loadouts":[{"id":"1", "processes":[{"id":"1", "main":"10.23.23.202:54678", "second":"10.23.23.202:54677", "status":"Running"}, {"id":"2", "main":"10.23.23.202:54679", "second":"-", "status":"Stopped"}, {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]}, {"id":"2", "processes":[{"id":"1", "main":"10.23.23.13:54678", "second":"10.23.23.13:54677", "status":"Running"}, {"id":"2", "main":"10.23.23.13:54679", "second":"-", "status":"Stopped"}, {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]}, {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"}, {"id":"3", "main":"10.23.23.123:54679", "second":"-", "status":"Stopped"}, {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]}]}



#TODO
def read_auth():
	with Path('./.auth/auth.conf').open().read_text() as F:
		pass

@app.get("/")
async def name(request: Request):
	dashboard_data = {"active_protocols":{"DD104":"/pages/dd104", "OPC UA":"/pages/something", "SomeBullshit":"/pages/suckmydick"}, "license":"12321", "pac_num":"123123","network":[{"id":"1", "addr":"10.23.23.123", "macaddr":"eb:1a:b0:b1:cc", "status": "1"}, {"id":"2", "addr":"127.0.0.1", "macaddr":"eb:1a:b0:b1:c1", "status": "0"}]} # 0 = down, 1 = up
	return templates.TemplateResponse("dashboard.html", {"request": request, "dashboard_data": dashboard_data})


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


# @app.get("/dashboard")
# def render_dash(request: Request):
# 	list1 = [{'id': 0, 'main': 28, 'second': 157, 'status': True}, {'id': 1, 'main': 157, 'second': 22, 'status': True}, {'id': 2, 'main': 194, 'second': 67, 'status': True}, {'id': 3, 'main': 87, 'second': 182, 'status': True}, {'id': 4, 'main': 89, 'second': 13, 'status': True}, {'id': 5, 'main': 142, 'second': 73, 'status': True}, {'id': 6, 'main': 37, 'second': 236, 'status': True}, {'id': 7, 'main': 42, 'second': 245, 'status': True}, {'id': 8, 'main': 198, 'second': 5, 'status': True}, {'id': 9, 'main': 220, 'second': 197, 'status': True}, {'id': 10, 'main': 121, 'second': 15, 'status': True}, {'id': 11, 'main': 158, 'second': 186, 'status': True}, {'id': 12, 'main': 239, 'second': 35, 'status': True}, {'id': 13, 'main': 182, 'second': 7, 'status': True}, {'id': 14, 'main': 108, 'second': 19, 'status': True}, {'id': 15, 'main': 31, 'second': 136, 'status': True}, {'id': 16, 'main': 198, 'second': 122, 'status': True}, {'id': 17, 'main': 19, 'second': 39, 'status': True}, {'id': 18, 'main': 26, 'second': 99, 'status': True}, {'id': 19, 'main': 145, 'second': 52, 'status': True}, {'id': 20, 'main': 180, 'second': 177, 'status': True}, {'id': 21, 'main': 243, 'second': 65, 'status': True}, {'id': 22, 'main': 228, 'second': 222, 'status': True}, {'id': 23, 'main': 66, 'second': 36, 'status': True}, {'id': 24, 'main': 47, 'second': 166, 'status': True}, {'id': 25, 'main': 218, 'second': 26, 'status': True}, {'id': 26, 'main': 129, 'second': 79, 'status': True}, {'id': 27, 'main': 158, 'second': 133, 'status': True}, {'id': 28, 'main': 175, 'second': 146, 'status': True}, {'id': 29, 'main': 156, 'second': 190, 'status': True}, {'id': 30, 'main': 61, 'second': 214, 'status': True}, {'id': 31, 'main': 159, 'second': 166, 'status': True}, {'id': 32, 'main': 128, 'second': 171, 'status': True}, {'id': 33, 'main': 149, 'second': 30, 'status': True}, {'id': 34, 'main': 239, 'second': 187, 'status': True}, {'id': 35, 'main': 99, 'second': 15, 'status': True}, {'id': 36, 'main': 125, 'second': 36, 'status': True}, {'id': 37, 'main': 65, 'second': 116, 'status': True}, {'id': 38, 'main': 79, 'second': 188, 'status': True}, {'id': 39, 'main': 27, 'second': 138, 'status': True}, {'id': 40, 'main': 203, 'second': 101, 'status': True}, {'id': 41, 'main': 90, 'second': 110, 'status': True}, {'id': 42, 'main': 250, 'second': 148, 'status': True}, {'id': 43, 'main': 121, 'second': 100, 'status': True}, {'id': 44, 'main': 140, 'second': 214, 'status': True}, {'id': 45, 'main': 219, 'second': 114, 'status': True}, {'id': 46, 'main': 35, 'second': 1, 'status': True}, {'id': 47, 'main': 243, 'second': 105, 'status': True}, {'id': 48, 'main': 184, 'second': 131, 'status': True}, {'id': 49, 'main': 27, 'second': 206, 'status': True}]
# 	
# 	return templates.TemplateResponse("lol.html", {"request":request, "list1":list1})
	


# @app.post("/token ")
# async def login(form_data: OAuth2PasswordRequestForm = Depends()):
# 	userdata = read_auth();
# 	if userdata['uname'] == form_data.username and userdata['pass'] == form_data.password:
# 		return {"access_token":userdata['uname'], "token_type":"bearer"}
# 	else:
# 		raise HTTPException(status_code=400, detail="Incorrect username or password")
