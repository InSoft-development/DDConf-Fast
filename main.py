from typing import Union, Annotated
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request, HTTPException, status, Form, WebSocket, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse, HTMLResponse, FileResponse, RedirectResponse
from fastapi.templating import Jinja2Templates 
from fastapi.middleware.cors import CORSMiddleware
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from time import sleep
import sqlite3, json, syslog, traceback, datetime, os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# from pages.router import router as router_pages
import pages.dd104 as DD104
import pages.dashboard as Dashboard
import pages.opcua as OPCUA
# import pages.login as Login
import models as Models

_mode = 'tx'

class ConnectionManager:
	def __init__(self):
		self.active_connections: list[WebSocket] = []

	async def connect(self, websocket: WebSocket):
		await websocket.accept()
		self.active_connections.append(websocket)

	def disconnect(self, websocket: WebSocket):
		self.active_connections.remove(websocket)

	async def send(self, message: str, websocket: WebSocket):
		await websocket.send_text(message)

	# async def broadcast(self, message: str):
	# 	for connection in self.active_connections:
	# 		await connection.send_text(message)


CManager = ConnectionManager()


class SyslogFSHandler(FileSystemEventHandler):
	
	websocket = None
	pid = None
	last_modified = None
	
	def __init__(self, WS: WebSocket, PID: str):
		self.last_modified = datetime.now()
		self.websocket = WS
		self.pid = PID
	
	async def on_modified(self, event):
		if datetime.now() - self.last_modified < timedelta(seconds=1):
			return
		# elif not self.websocket or self.websocket.connected:
		# 	return
		else:
			self.last_modified = datetime.now()
		
		data = DD104.get_logs(self.pid, 0)
		if self.websocket and self.websocket.connected:
			try:
				payload={"result":data, "errors":None} if not 'error' in data else {"result":None, "errors":data['error']}
				await CManager.send(json.dumps(payload), WS)
			except Exception as e:
				tb = traceback.format_exc().strip().split('\n')[1::]
				syslog.syslog(syslog.LOG_ERR, f"ddconf.main.syslogfshandler: error occured, details: {tb}")
		
		# print(f'Event type: {event.event_type}  path : {event.src_path}')
	

def prime_observer(WS: WebSocket, PID: str) -> Observer: 
	try:
		event_handler = SyslogFSHandler(WS, PID)
		observer = Observer()
		syslog.syslog(syslog.LOG_INFO, f"ddconf.main.prime_observer: observer {observer} created. ")
		observer.schedule(event_handler, "/var/log/syslog", recursive=True)
		return observer
	except Exception as e:
		tb = traceback.format_exc().strip().split('\n')[1::]
		msg = f"ddconf.main.prime_observer: unexpected exception caught, details: {tb}"
		syslog.syslog(syslog.LOG_ERR, msg)
		raise RuntimeError(msg)



@asynccontextmanager
async def lifespan(app: FastAPI):
	# startup
	pass
	yield
	# shutdown
	pass



# pwd_context = Login.pwd_context
# oauth2_scheme = Login.oauth2_scheme

app = FastAPI(docs_url=None, redoc_url=None, lifespan=lifespan)


BASE_DIR = Path(__file__).parent


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


app.mount("/client", StaticFiles(directory=os.path.join(os.getcwd(), "client"), html=True), name="client")


# @app.post("/token")
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),) -> Token:
# 	return Login.login_for_access_token(form_data)


@app.get("/")
def greet():
	return HTMLResponse(content=Path("./client/index.html").read_text(), status_code=200)


@app.get("/{_path}")
def redirect_root(_path: str):
	msg = f"ddconf.main.redirect_root: GET request detected to /{_path}, redirecting to \"/\"."
	print(msg)
	syslog.syslog(syslog.LOG_INFO, msg)
	return RedirectResponse("/", status_code=302)


@app.post("/dashboard")
def dashboard_post(REQ: Models.POST) -> dict:
	try:
		data = {}
		errs = None
		if REQ.method == "fetch_initial":
			
			return Dashboard.fetch_initial()
			
		elif REQ.method == "fetch_net":
			
			return Dashboard.fetch_net()
			
		elif REQ.method == "fetch_protocols":
			
			return Dashboard.fetch_protocols()
			
		
	except Exception as e:
		tb = traceback.format_exc().strip().split('\n')[1::]
		msg = f"ddconf.main.dashboard_post: Error: {tb}"
		syslog.syslog(syslog.LOG_CRIT, msg)
		return {"result": None, "error": msg}


@app.post("/dd104")
def dd104_post(REQ: Models.POST) -> dict:
	try:
		data = {} #just in case
		errs = None #just in case
		
		if REQ.method == "fetch_initial":
			
			data = {}
			data["active"] = DD104.get_active_ld()
			data["loadout_names"] = DD104.list_ld()
			
			print(f"ddconf.dd104.fetch_initial: {data}")
			
		
		elif REQ.method == "fetch_table":
			
			if DD104.get_active_ld():
				data = DD104.get_processes(DD104.get_active_ld())
				for item in data:
					item['status'] = DD104.get_status(data.index(item)+1) #WARNING this implies there are no duplicate entries, but there's no check for that in ld creation, beware
				print(f"ddconf.dd104.fetch_table({DD104.get_active_ld()}): {data}")
			
			else:
				print("ddconf.dd104.fetch_table: there is no active loadout!")
				data = None
				errs = None
			
		
		elif REQ.method == "process_handle":
			
			if REQ.params['op'] in ['start', 'stop', 'restart']:
				if type(REQ.params['pid']) == list:
					
					data = []
					errs = []
					
					for pid in REQ.params['pid']:
						try:
							data.append({"pid": pid, "status": DD104.process_handle(pid, REQ.params["op"])})
						except Exception as e:
							errs.append(f"pid: {pid}, err: {str(e)}")
				
				elif type(REQ.params['pid']) == str or type(REQ.params['pid']) == int:
					
					data = {"pid": REQ.params['pid'], "status": DD104.process_handle(REQ.params['pid'], REQ.params["op"])}
					
				else:
					raise TypeError(f"ddconf.dd104.process_handle: \"pid\" field must be str or list, got {type(REQ.params['pid'])}.")
				
			else:
				raise ValueError(f"ddconf.dd104.process_handle: incorrect operation keyword - {REQ.params['op']};")
		
		elif REQ.method == "profile_save": #TODO validation
			
			if REQ.params['name'] in DD104.list_ld() or ".loadout" in REQ.params['name']:
				try:
					data = DD104.save_ld(REQ.params['name'], REQ.params['data'])
				except Exception as e:
					msg = f"ddconf.dd104.dd104_save_ld_handler: Error: {str(e)}"
					syslog.syslog(syslog.LOG_ERR, msg)
					data = None
					errs.append(msg)
			else:
				errs = f"ddconf.dd104.profile_save: incorrect ld name; data: {REQ.params['name']}\n"
				data = None
		
		elif REQ.method == "profile_apply": #TODO validation
			
			if REQ.params['name'] in DD104.list_ld():
				try:
					data = DD104.apply_ld(REQ.params['name'])
				except Exception as e:
					tb=traceback.format_exc().strip().split('\n')[1::]
					msg = f"ddconf.dd104.profile_apply: Error: {str(e)}"
					print(f"ddconf.dd104.profile_apply: Error: {tb}")
					syslog.syslog(syslog.LOG_ERR, msg)
					data = None
					if type(errs) == list:
						errs.append(msg)
					elif type(errs) == type(None):
						errs = [msg]
			else:
				errs = f"ddconf.dd104.profile_apply: incorrect ld name; data: {REQ.params['name']}"
				data = None
		
		elif REQ.method == "fetch_ld":
			
			if REQ.params['name']:
				if REQ.params['name'] in DD104.list_ld():
					data = DD104.get_processes(REQ.params['name'])
					print(f"ddconf.dd104.fetch_ld({REQ.params['name']}): {data}")
				else:
					errs = f"ddconf.dd104.fetch_ld: incorrect ld name; data: {REQ.params['name']}\n"
					data = None
			else:
				errs = f"ddconf.dd104.fetch_ld: incorrect data: {REQ.params}\n"
				data = None
		
	except Exception as e:
		tb=traceback.format_exc().strip().split('\n')[1::]
		syslog.syslog(syslog.LOG_CRIT, f"ddconf.main.dd104_post: ERROR: {tb}")
		print(f"ddconf.main.dd104_post: ERROR: {tb}")
		return {"result":None, "error":str(e)}
	else:
		return {"result": data, "error":None if not errs else errs}


#TODO
@app.post('/opcua')
def handle_opcua(REQ:Models.POST):
	
	data = {}
	errs = []
	
	try:
		
		if REQ.method == 'post_ua':
			data = OPCUA.make_file(REQ.params, f"/etc/dd/opcua/ddOPCUA{'server' if _mode == 'rx' else 'client'}.ini")
		elif REQ.method == 'fetch_ua':
			data = OPCUA.fetch_file(f"/etc/dd/opcua/ddOPCUA{'server' if _mode == 'rx' else 'client'}.ini")
		#
		#WARNING: the function below assumes the existence of a cert archive
		#
		# elif REQ.method == 'fetch_certs':
		# 	data = OPCUA.fetch_certs()
		
		
	except Exception as e:
		tb=traceback.format_exc().strip().split('\n')[1::]
		syslog.syslog(syslog.LOG_CRIT, f"ddconf.main.handle_opcua: ERROR: {tb}")
		print(f"ddconf.main.handle_opcua: ERROR: {tb}")
		return {"result":None, "error":str(e)}
	
	return {"result": data, "error":None if not errs else errs}


@app.post('/opcua/certupload')
async def cert_uploader(files: list[UploadFile]):
	data = {}
	errs = []
	try:
		if not files:
			data = "No files were uploaded!"
		else:
			
	except Exception as e:
		pass
	
	return {"result": data, "error":None if not errs else errs}


#TODO very jank, but better already
@app.websocket("/ws_logs_104")
async def websocket_logs_104(WS: WebSocket):
	await WS.accept()
	syslog.syslog(syslog.LOG_INFO, f"Client connected")
	observer = prime_observer(WS)
	# observer.start()
	data = ""
	_data = ""
	_RQ = None
	while True:
		try:
			RQ = await WS.receive_text()
			syslog.syslog(syslog.LOG_INFO, f"ddconf.main.ws_logs_104: Client sent request: {RQ}")
			RQ = json.loads(RQ)
			
			if _RQ != RQ:
				_RQ = RQ
				if 'pid' in RQ and RQ['pid']:
					try:
						observer.start()
					except RuntimeError:
						syslog.syslog(syslog.LOG_INFO, f"ddconf.main.websocket_logs_104: reinitializing observer upon user request")
						observer.stop()
						observer = prime_observer(WS, RQ['pid'])
						observer.start()
				# else:
				# 	_data = data
				# 	data = DD104.get_logs(RQ['pid'], RQ['length'])
				# 	if not data == _data:
				# 		payload={"result":data, "errors":None} if not 'error' in data else {"result":None, "errors":data['error']}
				# 		await CManager.send(json.dumps(payload), WS)
				# 	sleep(0.5)
			
			
		except WebSocketDisconnect:
			CManager.disconnect(WS)
			observer.stop()
			syslog.syslog(syslog.LOG_INFO, f"Client disconnected")
			break
		except Exception as e:
			tb=traceback.format_exc().strip().split('\n')[1::]
			syslog.syslog(syslog.LOG_ERR, f"ddconf.main.ws_logs_104: Error while handling WS request; {tb}")
			await CManager.send(json.dumps({"response":None, "errors":str(e)}))
	
	observer.join()
	syslog.syslog(syslog.LOG_INFO, "ddconf.main.ws_logs_104: WS function shutdown")
