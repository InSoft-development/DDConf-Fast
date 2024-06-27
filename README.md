# DDConf-Fast

DataDiode Configuration Server developed with FastAPI

## endpoints: 

|endpoint|Method|Params|Response|Comment|
|---|---|---|---|---|
|dd104|"profile_save"|<pre>{<br/>"name": string, <br/>"data": \[\{"main": string , "second": string, "comment": string \}, ...\]<br/>}</pre>|<pre>{<br/>"result": null, <br/>"error": \[ string, ...\] \| null<br/>}</pre>| |
| |"profile_apply"|<pre>{<br/>"name": string, <br/>}</pre>|<pre>{<br/>"result": "success" \| null,<br/>"error": \[ string, ...\] \| null<br/>}</pre>| |
| |"process_handle"|<pre>{<br/>"pid": \[ int \] \|  int, <br/>"op": "stop" \| "start" \| "restart" <br/>}</pre>|<pre>{<br/>  "result": \[{"pid":  int , "status": -1\|0\|1\|2 }, ...\] \| {<br/>    "pid": int, "status": -1\|0\|1\|2<br/>  } \| null, <br/>  "error": \[ string, ...\] \| null<br/>}</pre>| the type of response\["result"\] depends on the type of params\["pid"\]|
| |"fetch_initial"| null |<pre>{<br/>  "result": {<br/>    "active": string \| null, <br/>    "loadout_names": \[ string \]<br/>  } \| null,<br/>  "error": string \| null<br/>}</pre>| formerly fetch_table |
| |"fetch_ld"|<pre>{<br/>  "name": string<br/>}</pre>|<pre>{<br/>  "result": {<br/>    "data": \[{<br/>        "main": string, <br/>        "second": string,<br/>        "comment": string,<br/>     }, ...\]<br/>  } \| null, <br/>  "error": null \| string<br/>}</pre>| |
|dashboard|"fetch_initial"|null| <pre>{<br/>  "result": {<br/>    "serial": string,<br/>    "license": string<br/>  } \| null,<br/>  "error": null \| string<br/>}</pre> | |
| |"fetch_protocols"| null | <pre>{<br/>  "result": \[<br/>    {<br/>      "name": string,<br/>      "link": string \| null<br/>    },<br/>    ...<br/>  \] \| null,<br/>  "error": null \| string<br/>}</pre> | |
| |"fetch_net"| null | <pre>{<br/>  "result": \[<br/>    {<br/>      "ip": null \| string, <br/>      "mac": string, <br/>      "status": string<br/>    },<br/>    ...<br/>  \] \| null,<br/>  "error": null \| \[ string \]<br/>}</pre> | |
|opcua|"post_ua"|<pre>{<br/>  "receiver": {<br/>    "addr": string,<br/>    "port": string<br/>  },<br/>  "servers": \[<br/>    {<br/>      "url1": string,<br/>      "url2": string,<br/>      "utoken_type": string,<br/>      "utoken_data": {<br/>        "username": string,<br/>        "password": string<br/>      } \| {<br/>        "cert": string,<br/>        "pkey": string<br/>      } \| null,<br/>      "secpolicy": string,<br/>      "mesmode": string,<br/>      "subscriptions": \[<br/>        {<br/>          "interval": int,<br/>          "items": string<br/>        },<br/>        ...<br/>      \]<br/>    },<br/>    ...<br/>  \]<br/>}</pre>|<pre>{<br/>  "result": string \| None,<br/>  "errors": None \| string<br/>}</pre>| |


