import React, { useMemo } from 'react';
import { Flex } from 'antd';
import Input from '../../input/input';
import { useWatch } from 'react-hook-form';

const AuthSection = ({ register, serverId: id, control }) => {

    const watchAuthType = useWatch({
        control,
        name: `servers.${id}.utoken_type`
    })

    const content = useMemo(() => {
        switch (watchAuthType) {
            case 'username': {
                return (
                    <>
                        <Flex align='center' justify='space-between'>
                            <label htmlFor={`servers.${id}.utoken_data.username`} className='text_type_main_default text_bold ml-10'>Логин</label>
                            <Input.Text
                                name={`servers.${id}.utoken_data.username`}
                                register={register}
                                placeholder='Введите логин'
                            />
                        </Flex>
                        <Flex align='center' justify='space-between'>
                            <label htmlFor={`servers.${id}.utoken_data.password`} className='text_type_main_default text_bold ml-10'>Пароль</label>
                            <Input.Password
                                name={`servers.${id}.utoken_data.password`}
                                register={register}
                                placeholder='Введите пароль'
                            />
                        </Flex>
                    </>
                )
            }
            case 'certificate':
            case 'anonymus':
            default: {
                return <></>
            }
        }
    }, [watchAuthType])

    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`servers.${id}.utoken_type`} className='text_type_main_medium text_bold'>Тип авторизации:</label>
                <Input.Select
                    name={`servers.${id}.utoken_type`}
                    register={register}
                    defaultValue={'anonymous'}
                    options={[{
                        value: 'anonymous',
                        text: 'Без авторизациия'
                    }, {
                        value: 'certificate',
                        text: 'По сертификату'
                    }, {
                        value: 'username',
                        text: 'По логину и паролю'
                    }]}
                />
            </Flex>
            {content}
        </>
    );
}

export default AuthSection;
