import React, { useMemo } from 'react';
import { Flex } from 'antd';
import Input from '../../input/input';
import { useWatch, useFormContext, Controller } from 'react-hook-form';

const AuthSection = ({ serverId: id }) => {

    const spaceName = `servers.${id}`;
    const { control } = useFormContext();

    const watchAuthType = useWatch({
        control,
        name: `${spaceName}.utoken_type`
    })

    const content = useMemo(() => {
        switch (watchAuthType) {
            case 'username': {
                return (
                    <>
                        <Flex align='center' justify='space-between'>
                            <label htmlFor={`${spaceName}.utoken_data.username`} className='text_type_main_default text_bold ml-10'>Логин</label>
                            <Controller
                                name={`${spaceName}.utoken_data.username`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Input.Text
                                        name={`${spaceName}.utoken_data.username`}
                                        placeholder='Введите логин'
                                        value={value}
                                        onChange={onChange}
                                        className='input'
                                    />
                                )}
                            />

                        </Flex>
                        <Flex align='center' justify='space-between'>
                            <label htmlFor={`${spaceName}.utoken_data.password`} className='text_type_main_default text_bold ml-10'>Пароль</label>
                            <Controller
                                control={control}
                                name={`${spaceName}.utoken_data.password`}
                                render={({ field: { value, onChange } }) => (
                                    <Input.Password
                                        name={`${spaceName}.utoken_data.password`}
                                        value={value}
                                        onChange={onChange}
                                        placeholder='Введите пароль'
                                        className='input'
                                    />
                                )}
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
    }, [watchAuthType, spaceName, control])

    return (
        <>
            <Flex align='center' justify='space-between'>
                <label htmlFor={`${spaceName}.utoken_type`} className='text_type_main_medium text_bold'>Тип авторизации:</label>
                <Controller
                    control={control}
                    name={`${spaceName}.utoken_type`}
                    render={({ field: { value, onChange } }) => (
                        <Input.Select
                            name={`${spaceName}.utoken_type`}
                            value={value}
                            onChange={onChange}
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
                            className='input'
                        />
                    )}
                />

            </Flex>
            {content}
        </>
    );
}

export default AuthSection;
