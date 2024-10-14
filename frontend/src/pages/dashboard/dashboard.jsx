import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDevicesNet, getDeviceFeatures, SET_DEFAULT_SLICE_STATE } from '../../services/actions/dashboard';
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
        devices,
        deviceFeaturesRequest,
        deviceNetRequest
    } = useSelector(store => store.device);

    useEffect(() => {
        dispatch(getDeviceFeatures())
        dispatch(getDevicesNet());

        return () => dispatch({ type: SET_DEFAULT_SLICE_STATE })
    }, [dispatch])

    const isDataUploding =
        deviceFeaturesRequest ||
        deviceNetRequest;

    return (
        <>
            <AppHeader title={headerTitle} />
            <div className='wrapper'>
                <div className={styles.dashboardPage}>
                    <Flex align='center'>
                        <div className='text_type_main_medium text_bold'>ПАК ОПТИ:</div>
                        {isDataUploding ? (
                            <LoadingOutlined className='ml-8' />
                        ) : (
                            <div className='text_type_main_default ml-4'>{serial}</div>
                        )}

                    </Flex>
                    <Flex align='center' className='mt-4'>
                        <div className='text_type_main_medium text_bold'>Лицензия:</div>
                        {isDataUploding ? (
                            <LoadingOutlined className='ml-8' />
                        ) : (
                            <div className='text_type_main_default ml-4'>{license}</div>
                        )}
                    </Flex>
                    <div className='mt-20'>
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
                    <div className='mt-20'>
                        <div className='text_type_main_medium text_bold'>Сетевые интерфейсы:</div>
                        <div className={styles.tableWrapper}>
                            <Table
                                className='mt-20'
                                rowKey={(record) => record.id}
                                loading={isDataUploding}
                                showHeader={false}
                                columns={dashboardTableSheme}
                                dataSource={devices}
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
