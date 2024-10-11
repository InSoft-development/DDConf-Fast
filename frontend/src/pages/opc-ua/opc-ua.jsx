import React, { useEffect } from 'react';
import OpcServer from '../../components/opc-server/opc-server';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getOpcUaForm, sendOpcUaForm } from '../../services/actions/opc-ua';
import AppHeader from '../../components/app-header/app-header';

import styles from './opc-ua.module.scss';

const OpcUa = ({ headerTitle }) => {

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
        // e.preventDefault();
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
        <>
            <AppHeader title={headerTitle} />
            <div className='wrapper'>
                <div className={styles.opcUa}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            {fields.map((field, index) => (
                                <OpcServer
                                    key={field.id}
                                    id={index}
                                    removeServer={removeServer}
                                />
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
            </div>
        </>
    )

}

export default OpcUa;