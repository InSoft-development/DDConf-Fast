 from pydantic import BaseModel
 from typing import Union, Annotated
 
class ProcessOperationTicket(BaseModel): #POT hehe
	PID: int
	OP: str
