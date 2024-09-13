import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Flex, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const SubscriptionsSection = ({ register, index: parentIndex, control}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `servers.${parentIndex}.subscriptions`
    })

    return (
        <>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <Flex align='center' justify='space-between'>
                        <h2 className={`text_type_main ${index === 0 && 'label-required-symbol'}`}>Подписка {index + 1}</h2>
                        <button className='button btn-red btn-circle'
                            onClick={e => remove(index)}
                        >
                            <DeleteOutlined/>
                        </button>
                    </Flex>
                    <Flex align='center' justify='space-between' className='mt-20'>
                        <label
                            htmlFor={`servers.${parentIndex}.subscriptions.${index}.interval`}
                            className='fw-b'
                        >Интервал публикации в мс:</label>
                        <input
                            id={`servers.${parentIndex}.subscriptions.${index}.interval`}
                            type="number"
                            className='opc-input'
                            placeholder='Введите интервал'
                            {...register(`servers.${parentIndex}.subscriptions.${index}.interval`, {
                                valueAsNumber: true
                            })}
                        />
                    </Flex>
                    <Flex vertical className='mt-4'>
                        <label
                            htmlFor={`servers.${parentIndex}.subscriptions.${index}.items`}
                        >Секция запроса тега</label>
                        <textarea
                            className='opc-textarea mt-6'
                            placeholder='Введите тег'
                            autoComplete='off'
                            id={`servers.${parentIndex}.subscriptions.${index}.items`}
                            {...register(`servers.${parentIndex}.subscriptions.${index}.items`)}
                        ></textarea>
                    </Flex>
                    <Divider />
                </div>
            ))}
            <div>
                <Flex justify='space-between' align='center'>
                    <button type="button"
                        className='button btn-green'
                        onClick={e => append({
                            interval: 0,
                            items: ''
                        })}
                    >
                        <PlusOutlined />
                        <span className='ml-4'>Добавить подписку</span>
                    </button>
                </Flex>
            </div>
        </>

    );
}

export default SubscriptionsSection;
