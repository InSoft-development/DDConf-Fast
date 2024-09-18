# DDConf-Fast

DataDiode Configuration Server developed with FastAPI

## endpoints: 

|endpoint|Method|Params|Response|Comment|
|---|---|---|---|---|
|dd104|"profile_save"|<pre>{<br/>"name": string, <br/>"data": \[\{"main": string , "second": string, "comment": string \}, ...\]<br/>}</pre>|<pre>{<br/>"result": null, <br/>"error": \[ string, ...\] \| null<br/>}</pre>| basic functionality: tested |
| |"profile_apply"|<pre>{<br/>"name": string, <br/>}</pre>|<pre>{<br/>"result": "success" \| null,<br/>"error": \[ string, ...\] \| null<br/>}</pre>| basic functionality: tested |
| |"process_handle"|<pre>{<br/>"pid": \[ int \] \|  int, <br/>"op": "stop" \| "start" \| "restart" <br/>}</pre>|<pre>{<br/>  "result": \[{"pid":  int , "status": -1\|0\|1\|2 }, ...\] \| {<br/>    "pid": int, "status": -1\|0\|1\|2<br/>  } \| null, <br/>  "error": \[ string, ...\] \| null<br/>}</pre>| the type of response\["result"\] depends on the type of params\["pid"\] ; basic functionality: tested |
| |"fetch_initial"| null |<pre>{<br/>  "result": {<br/>    "active": string \| null, <br/>    "loadout_names": \[ string \]<br/>  } \| null,<br/>  "error": string \| null<br/>}</pre>| basic functionality: tested |
| |"fetch_ld"|<pre>{<br/>  "name": string<br/>}</pre>|<pre>{<br/>  "result": [<br/>    {<br/>      "main": string, <br/>      "second": string,<br/>      "comment": string,<br/>    }, ...\]<br/> \| null, <br/>  "error": null \| string<br/>}</pre>| basic functionality: tested |
| |"fetch_table"|<pre>null</pre>|<pre>{<br/>  "result": [<br/>    {<br/>      "main": string, <br/>      "second": string,<br/>      "comment": string,<br/>      "status": int <br/>    }, ...\] \| null, <br/>  "error": null \| string<br/>}</pre>|  |
| |"ws_logs_104"|<pre>{<br/>  "pid": string,<br/>  "length": int(0..50) <br/>}</pre>|<pre>{<br/>  "result": {<br/>    "pid": string,<br/>    "data": string<br/>  } \| null,<br/>  "error": null \| string<br/>}</pre>| length:0 will return the whole info |
|dashboard|"fetch_initial"|null| <pre>{<br/>  "result": {<br/>    "serial": string,<br/>    "license": string<br/>  } \| null,<br/>  "error": null \| string<br/>}</pre> | |
| |"fetch_protocols"| null | <pre>{<br/>  "result": \[<br/>    {<br/>      "name": string,<br/>      "link": string \| null<br/>    },<br/>    ...<br/>  \] \| null,<br/>  "error": null \| string<br/>}</pre> | |
| |"fetch_net"| null | <pre>{<br/>  "result": \[<br/>    {<br/>      "ip": null \| string, <br/>      "mac": string, <br/>      "status": "up"\|"down"\|"unknown"<br/>    },<br/>    ...<br/>  \] \| null,<br/>  "error": null \| \[ string \]<br/>}</pre> | |
|opcua|"post_ua"|<pre>{<br/>  "restore":boolean,<br/>  "servers": \[<br/>    {<br/>      "url1": string,<br/>      "url2": string,<br/>      "utoken_type": "anonymous" \| "username" \| "certificate",<br/>      "utoken_data": {<br/>        "username": string,<br/>        "password": string<br/>      } \| {<br/>        "cert": file,<br/>        "pkey": file<br/>      } \| null,<br/>      "secpolicy": string,<br/>      "mesmode": string,<br/>      "subscriptions": \[<br/>        {<br/>          "interval": int,<br/>          "items": string<br/>        },<br/>        ...<br/>      \]<br/>    },<br/>    ...<br/>  \]<br/>}</pre>|<pre>{<br/>  "result": string \| None,<br/>  "error": None \| string<br/>}</pre>| utoken_types: "anonymous" - без авторизации, "username" - говорит само за себя, "certificate" - говорит само за себя |
| |"fetch_ua"| null |<pre>{<br/>  "result": {<br/>    "restore":boolean,<br/>    "servers": \[<br/>      {<br/>        "url1": string,<br/>        "url2": string \| null,<br/>        "utoken_type": "anonymous" \| "username" \| "certificate",<br/>        "utoken_data": {<br/>          "username": string,<br/>          "password": string<br/>        } \| null,<br/>        "secpolicy": string,<br/>        "mesmode": string,<br/>        "subscriptions": \[<br/>          {<br/>            "interval": int,<br/>            "items": string<br/>          },<br/>          ...<br/>        \]<br/>      },<br/>      ...<br/>    \],<br/>    "servers_len": int<br/>  } \| null,<br/>  "error": null \| string<br/>} </pre>|   |
| | "upload_certs" | <pre>{<br/>  "cert": file,<br/>  "pkey": file <br/>}</pre> | <pre>{<br/>  "result":string \| null,<br/>  "error": null \| \[ string \]<br/>} </pre> |  |
| network | "list_devices" | null | <pre>{<br/>  "result": \[ string \] \| null,<br/>  "error": null \| string<br/>}</pre> | | 
| | "fetch_device"| <pre>{<br/>  "id": string<br/>}</pre> | <pre>{<br/>  "result": {<br/>    "device": string,<br/>    "uptime": string,<br/>    "mac": string,<br/>    "rx": string,<br/>    "tx": string,<br/>    "ipv4": \[<br/>      {<br/>        "address": string,<br/>        "netmask": string,<br/>        "gateway": string,<br/>        "broadcast": string<br/>      }<br/>    \],<br/>    "protocol": string,<br/>  },<br/>  "errors": null<br/>}</pre> | ~~protocol можно реализовать в виде чекбокса "dhcp?", в зав-ти от значения которого становятся доступными для редактирования поля адреса и проч.;~~ <code><br/> Алексей настоял на селект-боксе; <br/><br/> содержимое data можно использовать как для наполнения полей редактора, так и для отображения поля status</code>| 
| | "process_op" |<pre>{<br/>  "op":"restart" \| "stop",<br/>} </pre>| <pre>{<br/>  "result": "success" \| null,<br/>  "error": null \| string<br/>}</pre> | |

<!--| |"fetch_certs"| <pre>{<br/>  "server_id": int <br/>}</pre> |<pre>{<br/> "result": {<br/>    "certs":\[ string \] <br/>  } \| null,<br/>  "error": null \| string <br/>}</pre>| currently not implemented |-->
