import React from 'react';
import { useWatch } from 'react-hook-form';
import { Flex, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AuthSection = ({ register, index, control, unregister, setValue }) => {

    const watchAuthType = useWatch({
        control,
        name: `servers.${index}.utoken_type`
    })

    const content = () => {
        switch (watchAuthType) {
            case 'anonymus': {
                return <></>
            }
            case 'username': {
                return (
                    <>
                        <Flex align='center' justify='space-between'>
                            <label
                                htmlFor={`servers.${index}.utoken_data.username`}
                                className='fw-m ml-4'
                            >Логин:</label>
                            <input
                                id={`servers.${index}.utoken_data.username`}
                                type="text"
                                {...register(`servers.${index}.utoken_data.username`)}
                                placeholder='Введите логин'
                                className='opc-input'
                                autoComplete="off"
                            />
                        </Flex>
                        <Flex align='center' justify='space-between'>
                            <label
                                htmlFor={`servers.${index}.utoken_data.username`}
                                className='fw-m ml-4'
                            >Пароль:</label>
                            <input
                                id={`servers.${index}.utoken_data.password`}
                                type="password"
                                {...register(`servers.${index}.utoken_data.password`)}
                                placeholder='Введите пароль'
                                className='opc-input'
                                autoComplete="off"
                            />
                        </Flex>
                    </>
                )
            }
            case 'certificate': {
                return (
                <>
                <Flex align='center' justify='space-between'>
                    <label className='fw-m ml-4'>Сертификат:</label>

                </Flex>
                <Flex align='center' justify='space-between'>
                    <label className='fw-m ml-4'>Приватный ключ:</label>

                </Flex>
                </>
                )
            }
            default: {

            }
        }
    }

    return (
        <>
            {content()}
        </>

    );
}

export default AuthSection;
