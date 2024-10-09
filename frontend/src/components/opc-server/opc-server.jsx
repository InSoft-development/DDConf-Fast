import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { UrlSection, AuthSection, SecuritySection, SubscriptionsSection } from './index';

import styles from './opc-server.module.scss';

const OpcServer = ({ id, removeServer }) => {

    return (
        <div className={styles.wrapper}>
            <h3 className='text_type_main_large'>Сервер {id + 1}</h3>
            <button type='button' className='btn-red btn-round'
                onClick={e => removeServer(id)}
            >
                <DeleteOutlined />
            </button>
            <UrlSection serverId={id} />
            <Divider />
            <AuthSection serverId={id} />
            <Divider />
            <SecuritySection serverId={id}/>
            <Divider />
            <SubscriptionsSection serverId={id}/>
        </div>

    );
}

export default OpcServer;
