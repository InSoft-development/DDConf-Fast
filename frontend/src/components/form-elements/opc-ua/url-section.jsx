import React, { useEffect } from 'react';
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
                    className='fw-b label-required-symbol'
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
                                htmlFor=""
                            >URL 2:</label>
                            <input type="text"
                                placeholder='Введите URL 2'
                                className='opc-input'
                            />
                        </Flex>
                    </>
                )
            }
        </>
    );
}

export default UrlSection;
