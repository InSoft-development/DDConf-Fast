import React from 'react';
import styles from './subscription.module.scss';
import { DeleteOutlined } from '@ant-design/icons';
import Input from '../../input/input';
import { Flex } from 'antd';

const Subscription = ({ subscriptionId: id, serverId, register, removeSubscription }) => {

    const spaceName = `servers.${serverId}.subscriptions.${id}`;

    return (
        <div className={styles.wrapper}>
            <h3 className='text_type_main_medium text_bold'>Подписка {id + 1}</h3>
            <button type='button' className='btn-red btn-round' onClick={e => {
                e.preventDefault();
                removeSubscription(id);
            }}>
                <DeleteOutlined />
            </button>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`${spaceName}.interval`} className='text_type_main_medium text_bold'>Интервал публикации в мс:</label>
                <Input.Number
                    register={register}
                    name={`${spaceName}.interval`}
                    width={377}
                />
            </Flex>
            <Flex vertical className='mt-20'>
                <label htmlFor={`${spaceName}.items`} className='text_type_main_medium text_bold'>Секция запроса тега:</label>
                <Input.Textarea
                    placeholder='Введите тег'
                    register={register}
                    name={`${spaceName}.items`}
                />
            </Flex>
        </div>
    );
}

export default Subscription;
