import React from 'react';
import OpcServer from '../../components/opc-server/opc-server';
import { useForm, useFieldArray } from 'react-hook-form';

import styles from './opc-ua.module.scss';

const OpcUa = () => {

    const { register, handleSubmit, control } = useForm({
        shouldUnregister: true,
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'servers',
        shouldUnregister: true
    })

    const addServer = (e) => {
        e.preventDefault();
        append({
            url1: '',
            url2_exists: false,
            utoken_type: 'anonymous',
            secpolicy: 'none',
            mesmode: 'none'
        });
    }

    const removeServer = (index) => {
        remove(index)
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className={`mt-10 ${styles.container}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className={styles.serversWrapper}>
                            <OpcServer 
                                id={index} 
                                register={register}
                                removeServer={removeServer}
                                control={control}
                            />
                        </div>
                    ))
                }
                
                <footer className={styles.footer}>
                    <div className='wrapper'>
                        <button type='button' onClick={addServer} className='btn-green mr-10'>Добавить сервер</button>
                        <button type='submit' className='btn-green'>Отправить</button>
                    </div>
                </footer>
            </form>

        </div>
    )

}

export default OpcUa;