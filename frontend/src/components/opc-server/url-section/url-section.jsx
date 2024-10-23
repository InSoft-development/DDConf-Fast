import React from 'react';
import { Flex } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Input from '../../input/input';
import { useWatch, useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';

import styles from './url-section.module.scss';

const UrlSection = ({ serverId: id }) => {

    const spaceName = `servers.${id}`;
    const { control } = useFormContext();

    const watchUrl2Exists = useWatch({
        control,
        name: `${spaceName}.url2_exists`
    })

    const checkboxClass = classNames({
        [styles.checkbox]: true,
        [styles.checkboxGreen]: !watchUrl2Exists,
        [styles.checkboxRed]: watchUrl2Exists,
    })

    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${id}.url1`} className='text_type_main_medium text_bold'>URL 1:</label>
                <Flex align='stretch' justify='space-between'>
                    <Controller
                        name={`${spaceName}.url1`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input.Text
                                name={`${spaceName}.url1`}
                                placeholder='Введите URL 1'
                                className='input input_border_sliced-right'
                                width={360}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Controller
                        name={`${spaceName}.url2_exists`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input.Checkbox
                                name={`${spaceName}.url2_exists`}
                                value={value}
                                onChange={onChange}
                                icon={
                                    watchUrl2Exists ? <MinusOutlined/> : <PlusOutlined/>
                                }
                                className={checkboxClass}
                            />
                        )}
                    />

                </Flex>
            </Flex>
            {watchUrl2Exists && (
                <Flex align='center' justify='space-between'>
                    <label htmlFor={`${spaceName}.url2`} className='text_type_main_medium text_bold'>URL 2:</label>
                    <Controller
                        name={`${spaceName}.url2`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input.Text
                                name={`${spaceName}.url2`}
                                placeholder='Введите URL 2'
                                value={value}
                                onChange={onChange}
                                className='input'
                            />
                        )}
                    />

                </Flex>
            )}
        </>
    );
}

export default UrlSection;
