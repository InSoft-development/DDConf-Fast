import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import styles from './opc-server.module.scss';

import UrlSection from '../opc-server/url-section/url-section';
import AuthSection from '../opc-server/auth-section/auth-section';
import SecuritySection from '../opc-server/security-section/security-section';
import SubscriptionsSection from '../opc-server/subscriptions-section/subscriptions-section';

const OpcServer = ({ id, register, removeServer, control }) => {

    return (
        <div className={styles.wrapper}>
            <h3 className='text_type_main_large'>Сервер {id + 1}</h3>
            <button type='button' className='btn-red btn-round'
                onClick={e => {
                    e.preventDefault();
                    removeServer(id)
                }}
            >
                <DeleteOutlined />
            </button>

            <UrlSection register={register} serverId={id} control={control}/>

            <Divider />

            <AuthSection register={register} serverId={id} control={control}/>

            <Divider />
            
            <SecuritySection register={register} serverId={id}/>

            <Divider />

            <SubscriptionsSection register={register} serverId={id} control={control}/>
            

        </div>

    );
}

export default OpcServer;
