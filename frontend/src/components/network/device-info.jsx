import React from 'react';
import { Flex } from 'antd';

import styles from './device-info.module.scss';

const DeviceInfo = ({ device }) => {

    return (
        <div className={styles.device}>
            <div className={styles.deviceRow}>
                <div className='text_type_main_default text_bold'>Device:</div>
                <div className='text_type_main_default'>{device?.device || ''}</div>
            </div>
            <div className={styles.deviceRow}>
                <div className='text_type_main_default text_bold'>Uptime:</div>
                <div className='text_type_main_default'>{device?.uptime || ''}</div>
            </div>
            <div className={styles.deviceRow}>
                <div className='text_type_main_default text_bold'>MAC:</div>
                <div className='text_type_main_default'>{device?.mac || ''}</div>
            </div>
            <div className={styles.deviceRow}>
                <div className='text_type_main_default text_bold'>RX:</div>
                <div className='text_type_main_default'>{device?.rx || ''}</div>
            </div>
            <div className={styles.deviceRow}>
                <div className='text_type_main_default text_bold'>TX:</div>
                <div className='text_type_main_default'>{device?.tx || ''}</div>
            </div>
            <div className={styles.deviceRow}>
                <div className='text_type_main_default text_bold'>Ipv4:</div>
                <div className='text_type_main_default'>{device?.ipv4[0].address || ''}</div>
            </div>
        </div>
    );
}

export default DeviceInfo;
