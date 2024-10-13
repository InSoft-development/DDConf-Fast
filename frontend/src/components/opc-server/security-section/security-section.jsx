import React from 'react';
import { Flex } from 'antd';
import Input from '../../input/input';
import { useFormContext, Controller } from 'react-hook-form';

const SecuritySection = ({ serverId: id }) => {

    const spaceName = `servers.${id}`;
    const { control } = useFormContext();

    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`${spaceName}.secpolicy`} className='text_type_main_medium text_bold'>Политика безопасности:</label>
                <Controller
                    control={control}
                    name={`${spaceName}.secpolicy`}
                    render={({ field: { value, onChange } }) => (
                        <Input.Select
                            name={`${spaceName}.secpolicy`}
                            value={value}
                            onChange={onChange}
                            options={[{
                                value: 'none',
                                text: 'none'
                            }, {
                                value: 'Basic256Sha256 - Sign',
                                text: 'Basic256Sha256 - Sign'
                            }, {
                                value: 'Basic256Sha256 - Sign & Encrypt',
                                text: 'Basic256Sha256 - Sign & Encrypt'
                            }, {
                                value: 'Aes128_Sha256_RsaOaep - Sign',
                                text: 'Aes128_Sha256_RsaOaep - Sign'
                            }, {
                                value: 'Aes128_Sha256_RsaOaep - Sign & Encrypt',
                                text: 'Aes128_Sha256_RsaOaep - Sign & Encrypt'
                            }, {
                                value: 'Aes256_Sha256_RsaPss - Sign',
                                text: 'Aes256_Sha256_RsaPss - Sign'
                            }, {
                                value: 'Aes256_Sha256_RsaPss - Sign & Encrypt',
                                text: 'Aes256_Sha256_RsaPss - Sign & Encrypt'
                            }]}
                            className='input'
                        />
                    )}
                />

            </Flex>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`${spaceName}.mesmode`} className='text_type_main_medium text_bold'>Режим шифрования <br /> сообщений:</label>
                <Controller
                    control={control}
                    name={`${spaceName}.mesmode`}
                    render={({ field: { value, onChange } }) => (
                        <Input.Select
                            value={value}
                            onChange={onChange}
                            name={`${spaceName}.mesmode`}
                            options={[{
                                value: 'none',
                                text: 'none'
                            }, {
                                value: 'Sign',
                                text: 'Sign'
                            }, {
                                value: 'Sign & Encrypt',
                                text: 'Sign & Encrypt'
                            }]}
                            className='input'
                        />
                    )}
                />

            </Flex>
        </>
    );
}

export default SecuritySection;
