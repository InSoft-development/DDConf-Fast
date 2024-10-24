import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNetwork, clearSlice } from '../../services/slices/dashboard';
import { Flex, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AppHeader from '../../components/app-header/app-header';
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
        fetchProtocolsStatus
    } = useSelector(store => store.dashboard);

    useEffect(() => {
        dispatch(fetchNetwork());

        return () => dispatch(clearSlice())
    }, [dispatch]);

    return (
        <>
            <AppHeader title={headerTitle} />
            <div className='wrapper'>
                <div className={styles.dashboardPage}>
                    <Flex align='center'>
                        <div className='text_type_main_medium text_bold'>ПАК ОПТИ:</div>
                        {fetchInitialStatus === 'pending' ? (
                            <LoadingOutlined className='ml-8' />
                        ) : (
                            <div className='text_type_main_default ml-4'>{serial}</div>
                        )}

                    </Flex>
                    <Flex align='center' className='mt-4'>
                        <div className='text_type_main_medium text_bold'>Лицензия:</div>
                        {fetchInitialStatus === 'pending' ? (
                            <LoadingOutlined className='ml-8' />
                        ) : (
                            <div className='text_type_main_default ml-4'>{license}</div>
                        )}
                    </Flex>
                    <div className='mt-20'>
                        <div className='text_type_main_medium text_bold'>Протоколы:</div>
                        <ul className={styles.protocolsList}>
                            {fetchProtocolsStatus === 'pending' ? (
                                <LoadingOutlined className='ml-8' />
                            ) : (
                                <>
                                    {protocols.map((protocol, index) => (
                                        <li key={index}>
                                            <Link to='/#' className='text_type_main_default'>{protocol.name}</Link>
                                        </li>
                                    ))}
                                </>
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