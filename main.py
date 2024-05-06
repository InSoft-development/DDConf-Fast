from typing import Union
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pages.router import router as router_pages
#from fastapi.templating import Jinja2Templates as J2T
from jinja2 import Environment, FileSystemLoader, select_autoescape
import pages.dd104 as dd104

env = Environment(
    loader=FileSystemLoader('./templates'),
    autoescape=select_autoescape(['html', 'xml'])
)





app = FastAPI()
app.include_router(router_pages)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

BASE_DIR = pathlib.Path(__file__).parent
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

templates = Jinja2Templates(directory="templates")


#return render_template('Protokol_MEK_104', get_active_ld=get_active_ld)

@app.get('/')
async def name(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

@app.get('/dd104/')
async def dd104_render(request: Request):
    return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request})
    # return render_template('Protokol_MEK_104', get_active_ld=get_active_ld)











    
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
