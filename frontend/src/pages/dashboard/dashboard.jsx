import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getDevicesNet, getDeviceFeatures } from '../../services/actions/dashboard';
import {Flex, Table} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './dashboard.module.css';

const Dashboard = () => {

    const dispatch = useDispatch();
    const {
        serial, 
        license,
        devices,
        deviceFeaturesRequest,
        deviceNetRequest
    } = useSelector(store => store.device)

    useEffect(() => {
        dispatch(getDeviceFeatures())
        dispatch(getDevicesNet());
    }, [])

    const columns = [
        {
            title: 'Индекс',
            dataIndex: 'id',
            key: 'id',
            render: (text) => (
                <div className='text_type_main_default' 
                     style={{color: '#0d6efd'}}>
                        {text + 1}.
                </div>
            )
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
            render: (text) => {
                if(text){
                    return <div className='text_type_main_default'>{text}</div>
                }else{
                    return <div className='text_type_main_default text_color_inactive'>—</div>
                }
                
            }
        },
        {
            title: 'MAC',
            dataIndex: 'mac',
            key: 'mac',
            render: (text) => (
                <div className='text_type_main_default'>{text}</div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch(text){
                    case 'up': {
                        return <div className='text_type_main_default'
                                    style={{color: '#28a745'}}
                        >Up, configured</div>
                    }
                    case 'down': {
                        return <div className='text_type_main_default'>Down</div>
                    }
                    default:{
                        return <></>
                    }
                }                 
            }
        }
    ];

    return (
        <div className='mt-20'>
            <div>
                <Flex align='center'>
                    <div className='text_type_main_medium text_bold'>ПАК ОПТИ:</div>
                    {deviceFeaturesRequest ? (
                        <LoadingOutlined className='ml-8' />
                        ) : (
                        <div className='text_type_main_default ml-4'>{serial}</div>
                    )}
                    
                </Flex>
                <Flex align='center' className='mt-4'>
                    <div className='text_type_main_medium text_bold'>Лицензия:</div>
                    {deviceFeaturesRequest ? (
                        <LoadingOutlined className='ml-8' />
                    ): (
                        <div className='text_type_main_default ml-4'>{license}</div>
                    )}
                </Flex>
            </div>
            <div className='mt-20'>
                <div>
                    <div className='text_type_main_medium text_bold'>Протоколы:</div>
                    <ul className={styles.protocolsList}>
                        <li>
                            <Link to='/dd104' className='text_type_main_default'>МЭК 104</Link>
                        </li>
                        <li>
                            <Link to='/opcua' className='text_type_main_default'>OPC UA</Link> 
                        </li>
                    </ul>
                </div>
            </div>
            <div className='mt-20'>
                <div className='text_type_main_medium text_bold'>Сетевые интерфейсы:</div>
                <div className={styles.tableWrapper}>
                    <Table
                        className='mt-20'
                        rowKey={(record) => record.id}
                        loading={deviceNetRequest}
                        showHeader={false}
                        columns={columns}
                        dataSource={devices}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
