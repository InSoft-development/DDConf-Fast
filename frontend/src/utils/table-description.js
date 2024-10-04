import { Badge, Flex, Input, Form } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    ReloadOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { store } from '../services/store';
import { changeProсess } from '../services/actions/profile';


const actions = [
    {
        key: 1,
        item: <PlayCircleOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
    },
    {
        key: 2,
        item: <PauseCircleOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
    },
    {
        key: 3,
        item: <ReloadOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
    },
];


const onActionBtnClickHandler = (actionIndex, processIndex) => {
    let action = null;
    switch (actionIndex) {
        case 0: {
            action = 'start';
            break;
        }
        case 1: {
            action = 'stop'
            break;
        }
        case 2: {
            action = 'restart'
            break;
        }
        default: {
            break;
        }
    }
    store.dispatch(changeProсess(action, processIndex))
}


export const columns = [
    {
        title: 'Процесс',
        dataIndex: 'id',
        width: '10%',
        key: 'id',
        render: (text) => (
            <div className='text_type_main_default'>{text + 1}</div>
        )
    },
    {
        title: 'Основной (IP:PORT)',
        dataIndex: 'main',
        width: '30%',
        key: 'main',
        render: (text) => (
            <div className='text_type_main_default'>{text}</div>
        )
    },
    {
        title: 'Резервный (IP:PORT)',
        dataIndex: 'second',
        key: 'second',
        width: '30%',
        render: (text) => {
            if (text === null) {
                return <div className='text_type_main_default text_color_inactive'>нет резерва</div>
            } else {
                return <div className='text_type_main_default'>{text}</div>
            }
        }
    },
    {
        title: 'Состояние',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: (text) => {
            switch (String(text)) {
                case '0': {
                    return <Badge status='warning' text="остановлен" className='text_type_main_default'/>
                }
                case '1': {
                    return <Badge status='success' text="запущен" className='text_type_main_default'/>
                }
                case '2': {
                    return <Badge status='processing' text="запускается" className='text_type_main_default'/>
                }
                case 'loading': {
                    return <LoadingOutlined />
                }
                case '-1': {
                    return <Badge status='error' text="ошибка" className='text_type_main_default'/>
                }
                case '-2': {
                    return <Badge status='error' text="крит. ошибка" className='text_type_main_default'/>
                }
                default: {
                    break;
                }
            }

        }
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
        width: '10%',
        render: (_, record) => (
            <Flex vertical={false} gap={'small'}>
                {
                    actions.map((action, index) => {
                        return <div key={`${record.id}_${index}`} onClick={(e) => {
                            onActionBtnClickHandler(index, record.id);
                        }}>{action.item}</div>;
                    })
                }
            </Flex>
        )
    },
];