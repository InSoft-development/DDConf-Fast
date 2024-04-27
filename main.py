from typing import Union
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
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
# PAC = [{"name":"Номер протокола"}] # ПАК ОПТИ:
# LIC = [{"name":"Номер лицензии"}]  # Лицензия:
# PROT = [{"name": "МЭК 104", "page":"pages/Protokol_MEK_104"},
#         {"name": "OPC UA"},
#         {"name": "OPC UA"},
#         {"name": "МЭК 104"},
#         {"name": "МЭК 104"},
#         {"name": "МЭК 104"},
#         {"name": "МЭК 104"}] # Протоколы

# SETINTERF = [{"namber_row":"1.","ip":"10.44.55.56","adres":"00:1b:63:84:45:e6","text":"Up, configured"},
#              {"namber_row":"2.","ip":"-","adres":"00:1b:63:84:45:e7","textt":"Down"},
#              {"namber_row":"3.","ip":" 10.44.55.57","adres":"00:1b:63:84:45:e8","text":"Up, configured"},
#              {"namber_row":"4.","ip":" 10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"5.","ip":" 10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"6.","ip":" 10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"7.","ip":" 10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"8.","ip":" 10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"9.","ip":" 10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"10.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"11.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"12.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","text":"Up, configured"},
#              {"namber_row":"13.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"},
#              {"namber_row":"14.","ip":"10.44.55.58","adres":"00:1b:63:84:45:e9","textt":"Down"}          
#              ]

# RABPROF = [{"name":"Название профиляzz"}]




dashboard_data = {"active_protocols":{"DD104":"/pages/dd104", "OPC UA":"/pages/something", "SomeBullshit":"/pages/suckmydick"},
                  "license":"12321", "pac_num":"123123",
                  "network":[{"id":"1", "addr":"10.23.23.123", "macaddr":"eb:1a:b0:b1:cc", "status": "1"},
                             {"id":"2", "addr":"127.0.0.1", "macaddr":"eb:1a:b0:b1:c1", "status": "0"}]} # 0 = down, 1 = up

DD104 = [{"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"запущен"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"},
         {"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"on"}
         ]

dd104_data = {"active_ld":
               {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"},
                                       {"id":"2", "main":"10.23.23.123:54679", "second":"-", "status":"Stopped"},
                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
                           "loadouts":[{"id":"1", "processes":[{"id":"1", "main":"10.23.23.202:54678", "second":"10.23.23.202:54677", "status":"Running"},
                                                               {"id":"2", "main":"10.23.23.202:54679", "second":"-", "status":"Stopped"},
                                                               {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
                                                               {"id":"2", "processes":[{"id":"1", "main":"10.23.23.13:54678", "second":"10.23.23.13:54677", "status":"Running"},
                                                                                       {"id":"2", "main":"10.23.23.13:54679", "second":"-", "status":"Stopped"},
                                                                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
                                                               {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"},
                                                                                       {"id":"3", "main":"10.23.23.123:54679", "second":"-", "status":"Stopped"},
                                                                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]}]}
 

@app.get('/')
async def name(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request, "dashboard_data": dashboard_data})

@app.get('/dd104/')
async def dd104_render(request: Request):
    return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request, "dashboard_data": dashboard_data, "DD104":DD104, })












    
# @app.get('/')
# async def name(request: Request):
#     return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request, "rabprof":rabprof})


app.include_router(router_pages)
# @app.get("/")
# def read_root():``
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
# ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# dd104_data = {"active_ld":
#               {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"},
#                                       {"id":"2", "main":"10.23.23.123:54679", "second":"-", "status":"Stopped"},
#                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
#                           "loadouts":[{"id":"1", "processes":[{"id":"1", "main":"10.23.23.202:54678", "second":"10.23.23.202:54677", "status":"Running"},
#                                                               {"id":"2", "main":"10.23.23.202:54679", "second":"-", "status":"Stopped"},
#                                                               {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
#                                                               {"id":"2", "processes":[{"id":"1", "main":"10.23.23.13:54678", "second":"10.23.23.13:54677", "status":"Running"},
#                                                                                       {"id":"2", "main":"10.23.23.13:54679", "second":"-", "status":"Stopped"},
#                                                                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
#                                                               {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"},
#                                                                                       {"id":"3", "main":"10.23.23.123:54679", "second":"-", "status":"Stopped"},
#                                                                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]}]}