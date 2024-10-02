import React, { useEffect } from 'react';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './network.module.css';
import { getDevices, getDeviceFeatures } from '../../services/actions/network';

const Network = () => {

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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex align='center' justify='space-between'>
                            <label htmlFor="">Status:</label>
                            <div>
                                <Flex align='center' justify='space-between'>
                                    <div>Device:</div>
                                    <div>{device.device}</div>
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <div>Uptime:</div>
                                    <div>{device.uptime}</div>
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <div>MAC:</div>
                                    <div>{device.mac}</div>
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <div>RX:</div>
                                    <div>{device.rx}</div>
                                </Flex>
                                <Flex align='center' justify='space-between'>
                                    <div>TX:</div>
                                    <div>{device.tx}</div>
                                </Flex>
                            </div>
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
                </>
            )}

        </div>
    );
}

export default Network;
