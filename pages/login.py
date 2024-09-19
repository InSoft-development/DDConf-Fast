from datetime import datetime, timedelta, timezone
from pathlib import Path
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import subprocess

from models import Token, TokenData, User, UserInDB

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = 0x6344f8dea565ea420b801d12f4eb0b9fb6a1ebab673e1fd5156df85c291adfcd
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


