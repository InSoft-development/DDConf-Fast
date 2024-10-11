import React from 'react';
import styles from './subscription.module.scss';
import { DeleteOutlined } from '@ant-design/icons';
import Input from '../../input/input';
import { Flex } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';

const Subscription = ({ subscriptionId: id, serverId, removeSubscription}) => {

    const spaceName = `servers.${serverId}.subscriptions.${id}`;
    const { control } = useFormContext();

    return (
        <div className={styles.wrapper}>
            <h3 className='text_type_main_medium text_bold'>Подписка {id + 1}</h3>
            <button type='button' className='btn-red btn-round' onClick={e => removeSubscription(id)}>
                <DeleteOutlined />
            </button>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`${spaceName}.interval`} className='text_type_main_medium text_bold'>Интервал публикации в мс:</label>
                <Controller
                    control={control}
                    name={`${spaceName}.interval`}
                    render={({ field: { value, onChange } }) => {
                        <Input.Number
                            name={`${spaceName}.interval`}
                            width={377}
                            value={value}
                            onChange={onChange}
                            placeholder='Введите интервал'
                        />
                    }}
                />

            </Flex>
            {/* <Flex vertical className='mt-20'>
                <label htmlFor={`${spaceName}.items`} className='text_type_main_medium text_bold'>Секция запроса тега:</label>
                <Controller
                    name={`${spaceName}.items`}
                    control={control}
                    render={({field: {value, onChange}}) => {
                        <Input.Textarea
                            placeholder='Введите тег'
                            name={`${spaceName}.items`}
                            value={value}
                            onChange={onChange}
                        />
                    }}
                />
            </Flex> */}
        </div>
    );
}

export default Subscription;
