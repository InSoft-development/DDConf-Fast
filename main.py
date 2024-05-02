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
# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DD104 = [{"num":"1","ipport":"10.30.44.15:23678678678","rezport":"norez","status":"no"},
         {"num":"2","ipport":"10.30.44.15:23678678678","rezport":"10.23.23.123:54677","status":"запущен"}      
         ]
# 

dd104_data = {"active_ld":
               {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"},
                                       {"id":"2", "main":"10.23.23.123:54679", "second_":"нет резерва", "status":"Stopped"},
                                       {"id":"3", "main":"sosat@kusat", "second_":"нет резерва", "status":"Failed"},
                                       {"id":"4", "main":"sosat@kusatt", "second":"10.23.23.123:54680", "status":"Failed"}]},
                           "loadouts":[{"id":"1", "processes":[{"id":"1", "main":"10.23.23.202:54678", "second":"10.23.23.202:54677", "status":"Running"},
                                                               {"id":"2", "main":"10.23.23.202:54679", "second":"-", "status":"Stopped"},
                                                               {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
                                                               {"id":"2", "processes":[{"id":"1", "main":"10.23.23.13:54678", "second":"10.23.23.13:54677", "status":"Running"},
                                                                                       {"id":"2", "main":"10.23.23.13:54679", "second":"-", "status":"Stopped"},
                                                                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]},
                                                               {"id":"3", "processes":[{"id":"1", "main":"10.23.23.123:54678", "second":"10.23.23.123:54677", "status":"Running"},
                                                                                       {"id":"3", "main":"10.23.23.123:54679", "second":"-", "status":"Stopped"},
                                                                                       {"id":"3", "main":"sosat@kusat", "second":"-", "status":"Failed"}]}]}
 
list1 = [{'id': 0, 'main': 28, 'second': 157, 'status': True}, {'id': 1, 'main': 157, 'second': 22, 'status': True}, {'id': 2, 'main': 194, 'second': 67, 'status': True}, {'id': 3, 'main': 87, 'second': 182, 'status': True}, {'id': 4, 'main': 89, 'second': 13, 'status': True}, {'id': 5, 'main': 142, 'second': 73, 'status': True}, {'id': 6, 'main': 37, 'second': 236, 'status': True}, {'id': 7, 'main': 42, 'second': 245, 'status': True}, {'id': 8, 'main': 198, 'second': 5, 'status': True}, {'id': 9, 'main': 220, 'second': 197, 'status': True}, {'id': 10, 'main': 121, 'second': 15, 'status': True}, {'id': 11, 'main': 158, 'second': 186, 'status': True}, {'id': 12, 'main': 239, 'second': 35, 'status': True}, {'id': 13, 'main': 182, 'second': 7, 'status': True}, {'id': 14, 'main': 108, 'second': 19, 'status': True}, {'id': 15, 'main': 31, 'second': 136, 'status': True}, {'id': 16, 'main': 198, 'second': 122, 'status': True}, {'id': 17, 'main': 19, 'second': 39, 'status': True}, {'id': 18, 'main': 26, 'second': 99, 'status': True}, {'id': 19, 'main': 145, 'second': 52, 'status': True}, {'id': 20, 'main': 180, 'second': 177, 'status': True}, {'id': 21, 'main': 243, 'second': 65, 'status': True}, {'id': 22, 'main': 228, 'second': 222, 'status': True}, {'id': 23, 'main': 66, 'second': 36, 'status': True}, {'id': 24, 'main': 47, 'second': 166, 'status': True}, {'id': 25, 'main': 218, 'second': 26, 'status': True}, {'id': 26, 'main': 129, 'second': 79, 'status': True}, {'id': 27, 'main': 158, 'second': 133, 'status': True}, {'id': 28, 'main': 175, 'second': 146, 'status': True}, {'id': 29, 'main': 156, 'second': 190, 'status': True}, {'id': 30, 'main': 61, 'second': 214, 'status': True}, {'id': 31, 'main': 159, 'second': 166, 'status': True}, {'id': 32, 'main': 128, 'second': 171, 'status': True}, {'id': 33, 'main': 149, 'second': 30, 'status': True}, {'id': 34, 'main': 239, 'second': 187, 'status': True}, {'id': 35, 'main': 99, 'second': 15, 'status': True}, {'id': 36, 'main': 125, 'second': 36, 'status': True}, {'id': 37, 'main': 65, 'second': 116, 'status': True}, {'id': 38, 'main': 79, 'second': 188, 'status': True}, {'id': 39, 'main': 27, 'second': 138, 'status': True}, {'id': 40, 'main': 203, 'second': 101, 'status': True}, {'id': 41, 'main': 90, 'second': 110, 'status': True}, {'id': 42, 'main': 250, 'second': 148, 'status': True}, {'id': 43, 'main': 121, 'second': 100, 'status': True}, {'id': 44, 'main': 140, 'second': 214, 'status': True}, {'id': 45, 'main': 219, 'second': 114, 'status': True}, {'id': 46, 'main': 35, 'second': 1, 'status': True}, {'id': 47, 'main': 243, 'second': 105, 'status': True}, {'id': 48, 'main': 184, 'second': 131, 'status': True}, {'id': 49, 'main': 27, 'second': 206, 'status': True}]
  
 

@app.get('/')
async def name(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request, "dashboard_data": dashboard_data})

@app.get('/dd104/')
async def dd104_render(request: Request):
    return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request, "dashboard_data": dashboard_data, "DD104":DD104, "list1":list1, "dd104_data":dd104_data})












    
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