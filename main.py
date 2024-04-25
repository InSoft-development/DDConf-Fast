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
PAC = [{"name":"Номер протокола"}] # ПАК ОПТИ:
LIC = [{"name":"Номер лицензии"}]  # Лицензия:
PROT = [{"name": "МЭК 104"},
        {"name": "OPC UA"},
        {"name": "OPC UA"},
        {"name": "МЭК 104"},
        {"name": "МЭК 104"},
        {"name": "МЭК 104"},
        {"name": "МЭК 104"}] # Протоколы

SETINTERF = [{"namber_row":"1.","ip":"10.44.55.56","adres":"00:1b:63:84:45:e6","text":"Up, configured"},
             {"namber_row":"2.","ip":"-","adres":"00:1b:63:84:45:e7","text":"Down"},
             {"namber_row":"3.","ip":"10.44.55.57","adres":"00:1b:63:84:45:e8","text":"Up, configured"},
             {"namber_row":"4.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"5.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"6.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"7.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"8.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"9.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"10.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"11.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"12.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"},
             {"namber_row":"13.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Down"}
             
             ]



@app.get('/')
async def name(request: Request):
    return templates.TemplateResponse("dashboard.html",{"request": request, "name": "Ivan", "PAC_OPTI":PAC, "LIC":LIC,"Protocols":PROT,"SETINTERF":SETINTERF})

app.include_router(router_pages)
# @app.get("/")
# def read_root():``
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}