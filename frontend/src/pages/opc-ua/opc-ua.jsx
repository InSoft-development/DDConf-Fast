import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import OpcServer from '../../components/opc-server/opc-server';
import Restore from '../../components/opc-server/restore/restore';
import { getOpcUaForm, sendOpcUaForm, SET_DEFAULT_SLICE_STATE } from '../../services/actions/opc-ua';
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

        return () => dispatch({ type: SET_DEFAULT_SLICE_STATE });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        methods.reset(form)
    }, [methods, form])

    return (
        <>
            <AppHeader title={headerTitle} />
            <div className='wrapper'>
                <div className={styles.opcUa}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Restore/>
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