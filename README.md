# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
|opcua|"post_ua"|<pre>{<br/>  "restore":boolean,<br/>  "servers": \[<br/>    {<br/>      "url1": string,<br/>      "url2": string,<br/>      "utoken_type": string,<br/>      "utoken_data": {<br/>        "username": string,<br/>        "password": string<br/>      } \| {<br/>        "cert": string,<br/>        "pkey": string<br/>      } \| null,<br/>      "secpolicy": string,<br/>      "mesmode": string,<br/>      "subscriptions": \[<br/>        {<br/>          "interval": int,<br/>          "items": string<br/>        },<br/>        ...<br/>      \]<br/>    },<br/>    ...<br/>  \]<br/>}</pre>|<pre>{<br/>  "result": string \| None,<br/>  "error": None \| string<br/>}</pre>| currently not implemented |
| |"fetch_ua"| null |<pre>{<br/>  "result": {<br/>    "restore":boolean,<br/>    "servers": \[<br/>      {<br/>        "url1": string,<br/>        "url2": string,<br/>        "utoken_type": string,<br/>        "utoken_data": {<br/>          "username": string,<br/>          "password": string<br/>        } \| {<br/>          "cert": string,<br/>          "pkey": string<br/>        } \| null,<br/>        "secpolicy": string,<br/>        "mesmode": string,<br/>        "subscriptions": \[<br/>          {<br/>            "interval": int,<br/>            "items": string<br/>          },<br/>          ...<br/>        \]<br/>      },<br/>      ...<br/>    \],<br/>    "servers_len": int<br/>  } \| null,<br/>  "error": null \| string<br/>} </pre>| currently not implemented |

=======
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

