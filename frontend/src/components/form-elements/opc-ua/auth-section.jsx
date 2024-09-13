import React from 'react';
import { useWatch } from 'react-hook-form';
import { Flex } from 'antd';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';

const AuthSection = ({ register, index, control }) => {

    const watchAuthType = useWatch({
        control,
        name: `servers.${index}.utoken_type`
    })

    const watchUploadPrivateKey = useWatch({
        control,
        name: `servers.${index}.utoken_data.pkey`
    })

    const watchUploadCertificate = useWatch({
        control,
        name: `servers.${index}.utoken_data.cert`
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
                            <label className='fw-m ml-4 '>Сертификат: </label>
                            <div className='opc-uload-wrapper'>
                                <label htmlFor={`servers.${index}.utoken_data.cert`}
                                    className='opc-label-upload mr-6'
                                >
                                    <UploadOutlined />
                                    <span className='fm-w ml-4'>Загрузить</span>
                                </label>
                                {watchUploadCertificate &&
                                    <span className='text_type_small'>
                                        <PaperClipOutlined />
                                        {watchUploadCertificate[0]?.name}
                                    </span>
                                }
                                <input
                                    id={`servers.${index}.utoken_data.cert`}
                                    className='opc-input-file'
                                    {...register(`servers.${index}.utoken_data.cert`)}
                                    type="file"
                                    accept='text/plain/, .txt'                                    
                                />
                            </div>

                        </Flex>
                        <Flex align='center' justify='space-between'>
                            <label className='fw-m ml-4'>Приватный ключ:</label>
                            <div className='opc-uload-wrapper'>
                                <label htmlFor={`servers.${index}.utoken_data.pkey`}
                                    className='opc-label-upload mr-6'
                                >
                                    <UploadOutlined />
                                    <span className='fm-w ml-4'>Загрузить</span>
                                </label>
                                {watchUploadPrivateKey &&
                                    <span className='text_type_small'>
                                        <PaperClipOutlined />
                                        {watchUploadPrivateKey[0]?.name}
                                    </span>
                                }
                                <input
                                    id={`servers.${index}.utoken_data.pkey`}
                                    className='opc-input-file'
                                    {...register(`servers.${index}.utoken_data.pkey`)}
                                    type="file"
                                    accept='.txt'
                                />
                            </div>

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
