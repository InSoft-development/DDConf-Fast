import React from 'react';
import styles from './opc-ua.module.css';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm, useFieldArray } from 'react-hook-form';
import OpcAuth from '../../components/form-elements/opc-auth/opc-auth';


const OpcUa = () => {

    const { register, handleSubmit, control, unregister, setValue } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'servers'
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='text'>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.restore}>
                    <span className='text_type_main mr-10'>Восстановить соединение после падения</span>
                    <input
                        type="checkbox"
                        {...register('restore')}
                    />
                </div>
                {
                    fields.map((server, index) => (
                        <div key={server.id} className={`mt-30 ${styles.server}`}>
                            {/* server title */}
                            <div className={styles.serverTitle}>
                                <h2 className='text text_type_average'>Сервер {index + 1}</h2>
                                <button type='button' className='button btn-red' onClick={e => remove(index)}>
                                    <DeleteOutlined className='mr-4'/>
                                    Удалить
                                </button>
                            </div>
                            {/* server url's */}
                            <div className={styles.ulrWrapper}>
                                <span className='text_type_main mr-10'>URL 1:</span>
                                <input type="text" 
                                    placeholder='Введите URL 1'
                                    className='input mr-10'
                                    {...register(`servers.${index}.url1`)}
                                />
                                <button type="button" className='button btn-green btn-circle'>
                                    <PlusOutlined/>
                                </button>
                            </div>
                            {/* authorization type */}
                            <div className={styles.authorizationType}>
                                <span className='text_type_main mr-10'>Тип авторизации</span>
                                <select 
                                    defaultValue={'anonymous'}
                                    {...register(`servers.${index}.utoken_type`)} 
                                    className='select'>
                                        <option value="anonymous">Без авторизации</option>
                                        <option value="certificate">По сертификату</option>
                                        <option value="username">По логину и паролю</option>
                                </select>
                                <OpcAuth
                                    control={control}
                                    index={index}
                                    register={register}
                                    unregister={unregister}
                                    setValue={setValue}
                                />
                            </div>
                            {/*subscription */}
                            
                        </div>
                    ))
                }

                <button type='button' className='button btn-green' onClick={e => append()}>
                    <PlusOutlined className='mr-4' />
                    Добавить сервер
                </button>
                <button type="submit" className='button btn-green'>Отправить</button>
            </form>
        </div>
    );
}

export default OpcUa;

