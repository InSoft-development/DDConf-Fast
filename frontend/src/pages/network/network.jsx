import React, { useEffect } from 'react';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './network.module.css';
import DeviceStatus from '../../components/network/device-status';
import { getDevices, getDeviceFeatures } from '../../services/actions/network';
import AppHeader from '../../components/app-header/app-header';

const Network = ({headerTitle}) => {

    const dispatch = useDispatch();
    const {
        listDevices,
        device,
        devicesListRequestSuccess,
        deviceFeaturesRequestSuccess
    } = useSelector(store => store.network)

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        dispatch(getDevices());
    }, [dispatch])

    useEffect(() => {
        reset(device)
    }, [reset, device])


    const onSubmit = (data) => {
        console.log(data);

    }

    return (
        <>
            <AppHeader title={headerTitle}/>
            <div className={`text ${styles.networkWrapper}`}>
                {devicesListRequestSuccess && (
                    <>
                        <Flex align='center' justify='space-between'>
                            <label htmlFor="devicesList">Устрйства: </label>
                            <select name="devicesList"
                                id="devicesList"
                                defaultValue='none'
                                onChange={e => dispatch(getDeviceFeatures(e.target.value))}
                            >
                                <option value="none">Не выбран</option>
                                {listDevices?.map((device, index) => (
                                    <option key={index}>{device}</option>
                                ))}
                            </select>
                        </Flex>
                        {deviceFeaturesRequestSuccess && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Flex align='center' justify='space-between'>
                                    <label htmlFor="">Status:</label>
                                    <DeviceStatus device={device} />
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <label htmlFor="">Protocol</label>
                                    <select name="" id="">
                                        <option value="">Static address</option>
                                        <option value="">Dynamic address</option>
                                    </select>
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <label htmlFor="">IPv4 address</label>
                                    <input type="text" {...register('ipv4.address')} />
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <label htmlFor="">IPv4 network</label>
                                    <input type="text" {...register('ipv4.network')} />
                                </Flex>

                                <footer className={styles.footer}>
                                    <div className='wrapper'>
                                        <button type='submit' className='button btn-green'>Отправить</button>
                                    </div>
                                </footer>
                            </form>
                        )}

                    </>
                )}

            </div>
        </>
    );
}

export default Network;
