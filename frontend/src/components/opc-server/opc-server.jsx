import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import styles from './opc-server.module.scss';

const OpcServer = ({ id, register, removeServer}) => {
    return (
        <div className={styles.wrapper}>
            <h3 className='text_type_main_large'>Сервер {id + 1}</h3>
            <button type='button' className='btn-red btn-round'
                onClick={e => {
                    e.preventDefault();
                    removeServer(id)
                }
                }
            >
                <DeleteOutlined />
            </button>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${id}.url1`} className='text_type_main_medium text_bold'>URL 1:</label>
                <input type="text" id={`servers.${id}.url1`}  {...register(`servers.${id}.url1`)}
                />
            </Flex>
        </div>

    );
}

export default OpcServer;
