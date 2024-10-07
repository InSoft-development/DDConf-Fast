import React from 'react';
import { Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Input from '../../input/input';
import { useWatch } from 'react-hook-form';

const UrlSection = ({ register, serverId: id, control }) => {

    const watchUrl2Exists = useWatch({
        control,
        name: `servers.${id}.url2_exists`
    })

    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${id}.url1`} className='text_type_main_medium text_bold'>URL 1:</label>
                <Flex align='stretch' justify='space-between'>
                    <Input.Text
                        name={`servers.${id}.url1`}
                        register={register}
                        placeholder='Введите URL 1'
                        className='input_border_sliced-right'
                        width={360}
                    />
                    <Input.Checkbox
                        name={`servers.${id}.url2_exists`}
                        register={register}
                        render={
                            () => (
                                <div className={''}>
                                    <PlusOutlined />
                                </div>
                            )
                        }
                    />
                </Flex>
            </Flex>
            {watchUrl2Exists && (
                <Flex align='center' justify='space-between'>
                    <label htmlFor={`servers.${id}.url2`} className='text_type_main_medium text_bold'>URL 2:</label>
                    <Input.Text
                        name={`servers.${id}.url2`}
                        placeholder='Введите URL 2'
                        register={register}
                    />
                </Flex>
            )}
        </>
    );
}

export default UrlSection;
