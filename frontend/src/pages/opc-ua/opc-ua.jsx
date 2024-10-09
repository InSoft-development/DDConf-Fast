import React, { useEffect } from 'react';
import OpcServer from '../../components/opc-server/opc-server';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getOpcUaForm, sendOpcUaForm } from '../../services/actions/opc-ua';

import styles from './opc-ua.module.scss';

const OpcUa = () => {

    const dispatch = useDispatch();
    const { form } = useSelector(store => store.opcua);

    const methods = useForm({
        shouldUnregister: true,
        defaultValues: {
            url1: '',
            url2_exists: false,
            utoken_type: 'anonymous',
            secpolicy: 'none',
            mesmode: 'none',
            subscriptions: [{
                interval: 0,
                items: ''
            }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
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
            mesmode: 'none',
            subscriptions: [{
                interval: 0,
                items: ''
            }]
        });
    }

    const removeServer = (index) => {
        remove(index)
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        dispatch(getOpcUaForm())
    }, [dispatch]);

    useEffect(() => {
        methods.reset(form)
    }, [form])

    return (
        <div className={`mt-10 ${styles.container}`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <div key={field.id} className={styles.serversWrapper}>
                            <OpcServer
                                id={index}
                                removeServer={removeServer}
                            />
                        </div>
                    ))}
                    <footer className={styles.footer}>
                        <div className='wrapper'>
                            <button type='button' onClick={addServer} className='btn-green mr-10'>Добавить сервер</button>
                            <button type='submit' className='btn-green'>Отправить</button>
                        </div>
                    </footer>
                </form>
            </FormProvider>
        </div>
    )

}

export default OpcUa;