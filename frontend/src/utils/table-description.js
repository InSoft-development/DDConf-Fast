import { Badge, Flex, Input, Form } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    ReloadOutlined,
    LoadingOutlined,
    DeleteOutlined,
    FormOutlined
} from '@ant-design/icons';
import { store } from '../services/store';
import { changeProсess } from '../services/actions/profile';
import {  
    DELTE_PROCESS_BY_ID, 
    RESET_EDITABLE_ROW_ID,
    SET_EDITABLE_COMMENT
} from '../services/actions/profile';
import { OPEN_COMMENT_EDITOR } from '../services/actions/modals';


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
    }
    store.dispatch(changeProсess(action, processIndex))
}


export const columns = [
    {
        title: 'Процесс',
        dataIndex: 'id',
        key: 'id',
        render: (text) => (
            <div className='text'>{text + 1}</div>
        )
    },
    {
        title: 'Основной (IP:PORT)',
        dataIndex: 'main',
        key: 'main',
        render: (text) => (
            <div className='text'>{text}</div>
        )
    },
    {
        title: 'Резервный (IP:PORT)',
        dataIndex: 'second',
        key: 'second',
        render: (text) => {
            if (text === null) {
                return <div className='text text_color_inactive'>нет резерва</div>
            } else {
                return <div className='text'>{text}</div>
            }
        }
    },
    {
        title: 'Состояние',
        dataIndex: 'status',
        key: 'status',
        showSorterTooltip: {
            target: 'full-header',
        },
        filters: [
            {
                text: 'Остановлен',
                value: 0,
            },
            {
                text: 'Запущен',
                value: 1,
            },
            {
                text: 'В процессе',
                value: 2,
            },
            {
                text: 'Ошибка',
                value: -1,
            }
        ],
        onFilter: (value, record) => record.status === value,

        render: (text) => {
            switch (String(text)) {
                case '0': {
                    return <Badge status='warning' text="остановлен" />
                }
                case '1': {
                    return <Badge status='success' text="запущен" />
                }
                case '2': {
                    return <Badge status='processing' text="в процессе" />
                }
                case 'loading': {
                    return <LoadingOutlined />
                }
                case '-1': {
                    return <Badge status='error' text="ошибка" />
                }
            }

        }
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
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

const onDeleteBtnClickHandler = (record) => {
    store.dispatch({
        type: DELTE_PROCESS_BY_ID,
        payload: record.id
    })
    store.dispatch({type: RESET_EDITABLE_ROW_ID})
}

const onCommentEditBtnClickHandler = (record) => {
    store.dispatch({
        type: OPEN_COMMENT_EDITOR
    })
    store.dispatch({
        type: SET_EDITABLE_COMMENT,
        payload: record.comment
    })
}

export const editColumns = [
    {
        title: 'Процесс',
        dataIndex: 'id',
        key: 'id',
        render: (text) => (
            <div className='text'>{text + 1}</div>
        )
    },
    {
        title: 'Основной (IP:PORT)',
        dataIndex: 'main',
        key: 'main',
        render: (text, record) => {
            if (record.id === store.getState().profile.editableRow) {
                return (
                    <Form.Item name='main'>
                        <Input value={text}
                            placeholder='Введите основной IP' />
                    </Form.Item>
                )
            } else {
                if (text === null) {
                    return <div className='text text_color_inactive'>укажите IP</div>
                } else {
                    return <div className='text'>{text}</div>
                }
            }

        }
    },
    {
        title: 'Резервный (IP:PORT)',
        dataIndex: 'second',
        key: 'second',
        render: (text, record) => {
            if (record.id === store.getState().profile.editableRow) {
                return (
                    <Form.Item name='second'>
                        <Input value={text}
                            placeholder='Введите резервный IP' />
                    </Form.Item>
                )
            } else {
                if (text === null) {
                    return <div className='text text_color_inactive'>укажите резерв</div>
                } else {
                    return <div className='text'>{text}</div>
                }
            }

        }
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => (
            <Flex style={{width: 60}} justify='space-between'>
                <DeleteOutlined
                    style={{ fontSize: 20, cursor: 'pointer' }}
                    onClick={e => {
                        e.stopPropagation();
                        onDeleteBtnClickHandler(record)
                    }}
                />
                <FormOutlined
                    style={{fontSize: 20, cursor: 'pointer'}}
                    onClick={e => {
                        onCommentEditBtnClickHandler(record)
                    }}
                />
            </Flex>

        )
    },
];