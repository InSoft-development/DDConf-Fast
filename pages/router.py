from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates


router = APIRouter(
	prefix="/pages",
	tags=["Pages"]
)

templates = Jinja2Templates(directory="templates")


@router.get("/dashboard")
def get_home_page_J_page(request: Request):
	return templates.TemplateResponse("dashboard.html", {"request": request})

@router.get("/Protokol_MEK_104")
def get_Protokol_MEK_104_J_page(request: Request):
	return templates.TemplateResponse("Protokol_MEK_104.html", {"request": request})
