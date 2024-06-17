import { Badge, Flex } from 'antd';
import { PlayCircleOutlined,
        PauseCircleOutlined,
        ReloadOutlined,
        FileTextOutlined
 } from '@ant-design/icons';


// 0- остановлени status="warning"
// 1 - запущен    status="success"
// 2 - в процессе status="processing"
// -1 ошибка      status="error"

const actions = [
    {
        key: 1,
        item: <PlayCircleOutlined style={{fontSize:24}}/>
    },
    {
        key: 2,
        item: <PauseCircleOutlined style={{fontSize:24}}/>
    },
    {
        key: 3,
        item: <ReloadOutlined style={{fontSize:24}}/>
    },
    {
        key: 4,
        item: <FileTextOutlined style={{fontSize:24}}/>
    }
];

const onActionBtnClickHandler = (e) => {
    console.log(e);
}

export const dataSource = [
    {
        key: '1',
        proccess: '1',
        mainIp: '10.30.44.15:23678',
        secondaryIp: null,
        status: 1,
        actions: 'действия'
    },
    {
        key: '2',
        proccess: '2',
        mainIp: '10.30.44.15:23678',
        secondaryIp: null,
        status: 2,
        actions: 'действия'
    },
    {
        key: '3',
        proccess: '3',
        mainIp: '10.30.44.15:23678',
        secondaryIp: '10.30.44.15:23678',
        status: 0,
        actions: 'действия'
    },
    {
        key: '4',
        proccess: '4',
        mainIp: '10.30.44.15:23678',
        secondaryIp: '10.30.44.15:23678',
        status: -1,
        actions: 'действия'
    },
];

export const columns = [
    {
        title: 'Процесс',
        dataIndex: 'proccess',
        key: 'proccess',
        render: (text) => (
            <div className='text'>{text}</div>
        )
    },
    {
        title: 'Основной (IP:PORT)',
        dataIndex: 'mainIp',
        key: 'mainIp',
        render: (text) => (
            <div className='text'>{text}</div>
        )
    },
    {
        title: 'Резервный (IP:PORT)',
        dataIndex: 'secondaryIp',
        key: 'secondaryIp',
        render: (text) => {
           if(text === null){
            return <div className='text text_color_inactive'>нет резерва</div>
           }else {
            return <div className='text'>{text}</div>
           }
        }
    },
    {
        title: 'Состояние',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            switch(String(text)){
                case '0': {
                    return <Badge status='warning' text="остановлен"/>
                }
                case '1': {
                    return <Badge status='success' text="запущен"/>
                }
                case '2': {
                    return <Badge status='processing' text="в процессе"/>
                }
                case '-1': {
                    return <Badge status='error' text="ошибка"/> 
                }
            }
            
        }
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
        render: (text) => (
            <Flex vertical={false} gap={'small'}>
            {
                actions.map((action, index) => {
                    return <div key={index} onClick={onActionBtnClickHandler}>{action.item}</div>;
                })
            }
            </Flex>
        )
    },
];
