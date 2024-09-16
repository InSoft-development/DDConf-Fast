import React, { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import styles from './opc-auth.module.css';

const OpcAuth = ({ control, index, register, unregister, setValue }) => {
    const watchAuthType = useWatch({
        control,
        name: `servers.${index}.utoken_type`
    })

    useEffect(() => {
        switch(watchAuthType){
            case 'anonymous':{
                unregister(`servers.${index}.utoken_data`)
                setValue(`servers.${index}.utoken_data`, null)
                break;
            }
            case 'username':{
                break;
            }
            default: {

            }
        }
    }, [watchAuthType])

    const content = () => {
        switch (watchAuthType) {
            case 'anonymous': {
                return (
                    <></>
                )
            }
            case 'username': {
                return (
                    <div className={styles.authByLogin}>
                        <div>
                            <span className='text_type_main mr-10'>Логин: </span>
                            <input type="text"
                                className='input'
                                placeholder='Введите логин'
                                {...register(`servers.${index}.utoken_data.username`)}
                            />
                        </div>
                        <div>
                            <span className='text_type_main mr-2'>Пароль: </span>
                            <input type="text"
                                className='input'
                                placeholder='Введите пароль'
                                {...register(`servers.${index}.utoken_data.password`)}
                            />
                        </div>
                    </div>
                )
            }
            default: {

            }
        }
    }

    return (
        <div>
            {content()}
        </div>
    );
}

export default OpcAuth;
