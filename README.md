# DDConf-Fast

DataDiode Configuration Server developed with FastAPI

## endpoints: 

|endpoint|Method|Params|Response|Comment|
|---|---|---|---|---|
|dd104|"profile_save"|<pre>{<br/>"filename": string, <br/>"data": \[\{"main": string , "second": string, "comment": string \}, ...\]<br/>}</pre>|<pre>{<br/>"result": null, <br/>"error": \[ string, ...\] \| null<br/>}</pre>| |
| |"profile_apply"|<pre>{<br/>"filename": string, <br/>}</pre>|<pre>{<br/>"result": "success" \| null,<br/>"error": \[ string, ...\] \| null<br/>}</pre>| |
| |"process_handle"|<pre>{<br/>"pid": \[ int \] \|  int, <br/>"op": "stop" \| "start" \| "restart" <br/>}</pre>|<pre>{<br/>"result": \[{ "pid":  int , "status": -1\|0\|1\|2 }, ...\] \| {"status": -1\|0\|1\|2}, <br/>"error": \[ string, ...\] \| null<br/>}</pre>| the type of response\["result"\] depends on the type of params\["pid"\]|
| |"fetch_table"| None |<pre>{<br/>  "result": {<br/>    "active":   {<br/>      "name": string, <br/>      "proc_data": \[{<br/>        "main": string, <br/>        "second": string,<br/>        "comment": string,<br/>        "status": -1\|0\|1\|2<br/>       }, ...\]<br/>      }, <br/>    "loadout_names": \[ string \]<br/>    },<br/>  "error": string \| null<br/>}</pre>| |


