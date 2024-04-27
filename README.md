# DDConf-Fast

DataDiode Configuration Server developed with FastAPI

# Data structures

dashboard data: 

| field | datatype | contains | comment |
| :---: | :---: | :---: | :---: |
| active_protocols | dict | {protocol name: str}:{url path: str} | url paths will be used later for redirection |
| license | str | device license number | - |
| pac_num | str | ПАК ОПТИ s/n number | - |
| network | list of dicts | id: {str}, addr:{str}, macaddr:{str}, status:{str} | network table lines |

dd104_data:

| field | datatype | contains | comment |
| :---: | :---: | :---: | :---: |
| active_ld | dict | id: {str}, processes:{list: {dict: {id:{str}, main:{str}, second:{str}, status:{str}}}} | active loadout data and statuses |
| loadouts | list of dicts | id: {str}, processes:{list: {dict: {id:{str}, main:{str}, second:{str}}}} | other loadouts' data |
