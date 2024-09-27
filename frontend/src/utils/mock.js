// 0- остановлени status="warning"
// 1 - запущен    status="success"
// 2 - в процессе status="processing"
// -1 ошибка      status="error"


export const dataSource = [
    {
        id: 0,
        main: '10.30.44.15:23678',
        second: null,
        status: 1,
        comment: 'Комментарий'
    },
    {
        id: 1,
        main: '10.30.44.15:23678',
        second: null,
        status: 2,
        comment: 'Комментарий'
    },
    {
        id: 2,
        main: '10.30.44.15:23678',
        second: '10.30.44.15:23678',
        status: 0,
    },
    {
        id: 3,
        main: '10.30.44.15:23678',
        second: '10.30.44.15:23678',
        status: -1,
        comment: 'Комментарий'
    },
];



export const logs = [
    "03.11.2023 16:27:46.48750 dd104client: Version: 2.3.231019.1109",
    "03.11.2023 16:27:46.110097 dd104client: srv: 10.23.23.113:2404 : Connection established",
    "03.11.2023 16:27:46.113928 dd104client: srv: 10.23.23.113:2404 : Received STARTDT_CON",
    "03.11.2023 16:35:35.409445 dd104client: Signal 15 received. Exiting...",
    "03.11.2023 16:35:36.220753 dd104client: srv: 10.23.23.113:2404 : Connection closed"
]
