# DDConf-Fast

DataDiode Configuration Server developed with FastAPI

## endpoints: 

|endpoint|Method|Params|Response|Comment|
|---|---|---|---|---|
|dd104|"profile_save"|<pre>{<br/>"filename": string, <br/>"data": \[\{"main": string , "second": string, "comment": string \}, ...\]<br/>}</pre>|<pre>{<br/>"result": null, <br/>"error": \[ string, ...\] \| null<br/>}</pre>| |
| |"process_handle"|<pre>{<br/>"pid": \[ int \] \|  int, <br/>"op": "stop" \| "start" \| "restart" <br/>}</pre>|<pre>{<br/>"result": \[{ "pid":  int , "status": -1\|0\|1\|2 }, ...\] \| {"status": -1\|0\|1\|2}, <br/>"error": \[ string, ...\] \| null<br/>}</pre>| the type of response\["result"\] depends on the type of params\["pid"\]|
| |"profile_apply"|string (profile name)|<pre>{<br/>"result": "success" \| "error",<br/>"error": \[ string, ...\]<br/>}</pre>| |


