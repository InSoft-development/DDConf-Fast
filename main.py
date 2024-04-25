from typing import Union
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pages.router import router as router_pages
#from fastapi.templating import Jinja2Templates as J2T
from jinja2 import Environment, FileSystemLoader, select_autoescape

# env = Environment(
#     loader=FileSystemLoader('.'),
#     autoescape=select_autoescape(['html', 'xml'])
# )

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")
PAC = [{"name":"Protocl_name"},
       {"name":"Protocl_name"}]

# NAME = [{"name": "Ivan", "type": "test"},
#         {"name": "Roma", "type":"test"},
#         {"name": "Alex", "type": "test"},
#         {"name": "Bob",  "type": "test"},
#         {"name": "Bob",  "type": "test"}]

@app.get('/')
async def name(request: Request):
    return templates.TemplateResponse("dashboard.html",{"request": request, "name": "Ivan", "PAC_OPTI":PAC})

app.include_router(router_pages)
# @app.get("/")
# def read_root():``
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}