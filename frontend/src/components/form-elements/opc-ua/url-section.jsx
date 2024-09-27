import React from 'react';
import { Flex } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useWatch } from 'react-hook-form';
import  * as classNames from 'classnames';

const UrlSection = ({ register, index: parentIndex, control }) => {

    const watchUrl2Checked = useWatch({
        control,
        name: `servers.${parentIndex}.url2_exists`
    })

    const btnClass = classNames({
        'opc-button-left-slice': true,
        'slice-green': !watchUrl2Checked,
        'slice-red': watchUrl2Checked
    })

    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${parentIndex}.url1`}
                    className='fw-b '
                >URL 1:</label>
                <Flex>
                    <input
                        type="text"
                        id={`servers.${parentIndex}.url1`}
                        placeholder='Введите URL 1'
                        className='opc-input-right-slice'
                        {...register(`servers.${parentIndex}.url1`)}
                    />
                    <label
                        htmlFor={`servers.${parentIndex}.url2_exists`}
                        className={btnClass}
                    >
                        {!watchUrl2Checked ? (
                            <PlusOutlined style={{ color: 'white' }} />
                        ):(
                            <MinusOutlined style={{color: 'white'}}/>
                        )}
                        
                    </label>
                    <input type='checkbox'
                        id={`servers.${parentIndex}.url2_exists`}
                        style={{ display: 'none' }}
                        {...register(`servers.${parentIndex}.url2_exists`)}
                    />
                </Flex>
            </Flex>
            {
                watchUrl2Checked && (
                    <>
                        <Flex align='center' justify='space-between'>
                            <label className='fw-b'
                                htmlFor={`servers.${parentIndex}.url2`}
                            >URL 2:</label>
                            <input type="text"
                                id={`servers.${parentIndex}.url2`}
                                placeholder='Введите URL 2'
                                className='opc-input'
                                {...register(`servers.${parentIndex}.url2`)}
                            />
                        </Flex>
                    </>
                )
            }
        </>
    );
}

export default UrlSection;
