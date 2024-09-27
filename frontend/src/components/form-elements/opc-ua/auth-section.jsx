import React from 'react';
import { useWatch } from 'react-hook-form';
import { Flex } from 'antd';

const AuthSection = ({ register, index, control }) => {

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
