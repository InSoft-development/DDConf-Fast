import React from 'react';
import { Flex } from 'antd';
import Input from '../../input/input';

const SecuritySection = ({register, serverId: id}) => {
    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${id}.secpolicy`} className='text_type_main_medium text_bold'>Политика безопасности:</label>
                <Input.Select
                    id={`servers.${id}.secpolicy`}
                    name={`servers.${id}.secpolicy`}
                    register={register}
                    defaultValue={'none'}
                    options={[{
                        value: 'none',
                        text: 'none'
                    },{
                        value: 'Basic256Sha256 - Sign',
                        text: 'Basic256Sha256 - Sign'
                    },{
                        value: 'Basic256Sha256 - Sign & Encrypt',
                        text: 'Basic256Sha256 - Sign & Encrypt'
                    },{
                        value: 'Aes128_Sha256_RsaOaep - Sign',
                        text: 'Aes128_Sha256_RsaOaep - Sign'
                    },{
                        value: 'Aes128_Sha256_RsaOaep - Sign & Encrypt',
                        text: 'Aes128_Sha256_RsaOaep - Sign & Encrypt'
                    },{
                        value: 'Aes256_Sha256_RsaPss - Sign',
                        text: 'Aes256_Sha256_RsaPss - Sign'
                    },{
                        value: 'Aes256_Sha256_RsaPss - Sign & Encrypt',
                        text: 'Aes256_Sha256_RsaPss - Sign & Encrypt'
                    }]}
                />
            </Flex>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${id}.mesmode`} className='text_type_main_medium text_bold'>Режим шифрования <br /> сообщений:</label>
                <Input.Select
                    id={`servers.${id}.mesmode`}
                    name={`servers.${id}.mesmode`}
                    register={register}
                    defaultValue={'none'}
                    options={[{
                        value: 'none',
                        text: 'none'
                    },{
                        value: 'Sign',
                        text: 'Sign'
                    },{
                        value: 'Sign & Encrypt',
                        text: 'Sign & Encrypt'
                    }]}
                />
            </Flex>
        </>
    );
}

export default SecuritySection;
