from typing import Union, Annotated
from fastapi import FastAPI, Depends, Request, HTTPException, status, Form
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, PlainTextResponse
from fastapi.templating import Jinja2Templates 
from jinja2 import Environment, FileSystemLoader, select_autoescape
from router.pages import router as router_pages
import sqlite3

import dd104, dashboard


# env = Environment(
#     loader=FileSystemLoader('./templates'),
#     autoescape=select_autoescape(['html', 'xml'])
# )

app = FastAPI()
app.include_router(router_pages)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates("templates")






#TODO
def read_auth():
	with Path('./.auth/auth.conf').open().read_text() as F:
		pass

@app.get("/")
async def name(request: Request):
	# dashboard_data = dd104.get_processes(1)
	return templates.TemplateResponse("dashboard.html", {"request": request, "dashboard_data": dashboard_data})


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}



