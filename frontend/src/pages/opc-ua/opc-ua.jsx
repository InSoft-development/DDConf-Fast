import React from 'react';
import styles from './opc-ua.module.css';
import { Flex } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import AuthSection from '../../components/form-elements/opc-ua/auth-section';


const OpcUa = () => {

    const { register, handleSubmit, control, unregister, setValue } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'servers'
    })

    const onSubmit = (data) => {
        console.log(data);
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`text text-18 ${styles.form}`}>
            {/* restore */}
            <div className={styles.restore}>
                <label htmlFor="restore" className='fw-b mr-10 ml-10'>Восстановить соединение после падения</label>
                <input
                    id='restore'
                    {...register('restore')}
                    type="checkbox"
                />
            </div>
            {/* servers fields */}
            <div className='mt-20'>
                {
                    fields.map((server, index) => (
                        <div key={server.id} className={styles.server}>
                            {/* title & delete button */}
                            <h3 className={styles.serverTitle}>Сервер {index + 1}</h3>
                            <button type="button"
                                className={`button btn-red btn-circle ${styles.serverDeleteBtn}`}
                                onClick={e => remove(index)}
                            >
                                <DeleteOutlined />
                            </button>
                            {/* URL's */}
                            <div className={styles.serverInputsRows}>
                                <Flex align='center' justify='space-between'>
                                    <label
                                        htmlFor={`servers.${index}.url1`}
                                        className='fw-b'
                                    >URL 1:</label>
                                    <input
                                        id={`servers.${index}.url1`}
                                        type="text"
                                        {...register(`servers.${index}.url1`)}
                                        placeholder='Введите URL 1'
                                        className='opc-input'
                                        autoComplete="off"
                                    />
                                    <label htmlFor={`servers.${index}.url2_exists`}
                                        className={`${styles.urlCheckboxLabel}`}
                                        title='Добавить url 2'
                                    >
                                        <PlusOutlined style={{ color: 'white' }} />
                                    </label>
                                    <input
                                        id={`servers.${index}.url2_exists`}
                                        className={styles.urlCheckbox}
                                        type="checkbox"
                                        {...register(`servers.${index}.url2_exists`)}
                                    />
                                </Flex>
                                {/* Registration Type */}
                                <Flex align='center' justify='space-between'>
                                    <label
                                        htmlFor={`servers.${index}.utoken_type`}
                                        className='fw-b'
                                    >Тип авторизации:</label>
                                    <select
                                        defaultValue={'anonymous'}
                                        id={`servers.${index}.utoken_type`}
                                        {...register(`servers.${index}.utoken_type`)}
                                        className='opc-input'
                                    >
                                        <option value="anonymous">Без авторизации</option>
                                        <option value="certificate">По сертификату</option>
                                        <option value="username">По логину и паролю</option>
                                    </select>
                                </Flex>
                                {/*  */}
                                <AuthSection
                                    register={register}
                                    index={index}
                                    control={control}
                                    unregister={unregister}
                                    setValue={setValue}
                                />
                                <Flex align='center' justify='space-between'>
                                    
                                </Flex>

                            </div>
                        </div>
                    ))
                }
            </div>

            <div>
                <button type="button" className="button btn-green" onClick={e => append()}>Добавить сервер</button>
                <button type="submit" className='button btn-green'>Отправить</button>
            </div>
        </form>
    )

}

export default OpcUa;

