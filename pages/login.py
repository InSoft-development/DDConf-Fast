from datetime import datetime, timedelta, timezone
from pathlib import Path
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

import subprocess

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = 0x6344f8dea565ea420b801d12f4eb0b9fb6a1ebab673e1fd5156df85c291adfcd
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def read_auth_data() -> dict:
	lines = Path('./.auth/auth.conf').read_text().strip().split('\n')
	data = {}
	for line in lines:
		if "login=" in line:
			data["login"] = line.split("login=")[1]
		if "password=" in line:
			data["password"] = line.split("password=")[1]
		if "uname=" in line:
			data["username"] = line.split("uname=")[1]
	
	data['admin']['disabled'] = False
	
	return {data["username"] : data}


auth_users_db = read_auth_data()


class Token(BaseModel):
	access_token: str
	token_type: str


class TokenData(BaseModel):
	username: str | None = None


class User(BaseModel):
	username: str
	email: str | None = None
	full_name: str | None = None
	disabled: bool | None = None


class UserInDB(User):
	hashed_password: str


def verify_password(plain_password, hashed_password):
	return pwd_context.verify(plain_password, read_auth_data()['admin']['password'])


def get_password_hash(password):
	return pwd_context.hash(password)


def get_user(db, username: str):
	if username in db:
		user_dict = db[username]
		return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
	user = get_user(fake_db, username)
	if not user:
		return False
	if not verify_password(password, user.hashed_password):
		return False
	return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
	to_encode = data.copy()
	if expires_delta:
		expire = datetime.now(timezone.utc) + expires_delta
	else:
		expire = datetime.now(timezone.utc) + timedelta(minutes=15)
	to_encode.update({"exp": expire})
	encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
	return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
	credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Could not validate credentials",
		headers={"WWW-Authenticate": "Bearer"},
	)
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
		username: str = payload.get("sub")
		if username is None:
			raise credentials_exception
		token_data = TokenData(username=username)
	except JWTError:
		raise credentials_exception
	user = get_user(auth_users_db, username=token_data.username)
	if user is None:
		raise credentials_exception
	return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
	if current_user.disabled:
		raise HTTPException(status_code=400, detail="Inactive user")
	return current_user


async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),) -> Token:
	user = authenticate_user(auth_users_db, form_data.username, form_data.password)
	if not user:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Incorrect username or password",
			headers={"WWW-Authenticate": "Bearer"},
		)
	access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
	access_token = create_access_token(
		data={"sub": user.username}, expires_delta=access_token_expires
	)
	return Token(access_token=access_token, token_type="bearer")
