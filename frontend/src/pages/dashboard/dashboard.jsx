import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import AppHeader from '../../components/app-header/app-header';
import { fetchNetwork, clearSlice } from '../../services/slices/dashboard';
import dashboardTableSheme from '../../models/dashboard-table.sheme';

import styles from './dashboard.module.scss';

const Dashboard = ({ headerTitle }) => {

    const dispatch = useDispatch();
    const {
        serial,
        license,
        network,
        protocols,
        fetchInitialStatus,
        fetchNetworkStatus,
        fetchProtocolsStatus,
        fetchInitialError,
        fetchNetworkError,
        fetchProtocolsError
    } = useSelector(store => store.dashboard);

    useEffect(() => {
        dispatch(fetchNetwork());

        return () => dispatch(clearSlice())
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <AppHeader title={headerTitle} />
            <div className='wrapper'>
                <div className={styles.dashboardPage}>
                    <Flex align='center'>
                        <div className='text_type_main_medium text_bold'>ПАК ОПТИ:</div>
                        {!fetchInitialError && 
                            (fetchInitialStatus === 'pending' ? (
                                <LoadingOutlined className='ml-8' />
                            ) : (
                                serial && (<div className='text_type_main_default ml-4'>{serial}</div>)
                            ))
                        }
                    </Flex>
                    <Flex align='center' className='mt-4'>
                        <div className='text_type_main_medium text_bold'>Лицензия:</div>
                        {!fetchInitialError && 
                            (fetchInitialStatus === 'pending' ? (
                                <LoadingOutlined className='ml-8' />
                            ) : (
                                license && (<div className='text_type_main_default ml-4'>{license}</div>)
                            ))
                        }                       
                    </Flex>
                    <div className='mt-20'>
                        <div className='text_type_main_medium text_bold'>Протоколы:</div>
                        <ul className={styles.protocolsList}>
                            { !fetchProtocolsError && (
                                fetchProtocolsStatus === 'pending' ? (
                                    <LoadingOutlined className='ml-8' />
                                ) : (
                                    protocols?.length && protocols.map(protocol => (
                                        <li key={protocol.name}>
                                            <Link to={protocol.link} className='text_type_main_default'>{protocol.title}</Link>
                                        </li>
                                    ))
                                )
                            )}                            
                        </ul>
                    </div>
                    <div className='mt-20'>
                        <div className='text_type_main_medium text_bold'>Сетевые интерфейсы:</div>
                        <div className={styles.tableWrapper}>
                            <Table
                                className='mt-20'
                                rowKey={(record) => record.id}
                                loading={fetchNetworkStatus === 'pending'}
                                showHeader={false}
                                columns={dashboardTableSheme}
                                dataSource={network}
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;