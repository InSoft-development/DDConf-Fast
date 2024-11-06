import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';

import Restore from '../../components/opc-server/restore/restore';
import OpcServer from '../../components/opc-server/opc-server';
import { fetchUa, postUa, clearSlice } from '../../services/slices/opcua';
import AppHeader from '../../components/app-header/app-header';

import styles from './opc-ua.module.scss';

const OpcUa = ({ headerTitle }) => {

    const dispatch = useDispatch();
    const {
        form,
        fetchUaStatus,
        fetchUaError,
        postUaStatus,
        postUaError
    } = useSelector(store => store.opcua);

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
        dispatch(postUa({form: data}));
    }

    const isButtonsDisabled = 
        fetchUaStatus === 'pending' ||
        postUaStatus === 'pending';


    useEffect(() => {
        dispatch(fetchUa())

        return () => dispatch(clearSlice());
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
                            {!fetchUaError &&
                                fetchUaStatus === 'pending' ? (
                                <LoadingOutlined className='ml-8' />
                            ) : (
                                Object.keys(form).length && (
                                    <>
                                        <Restore />
                                        {fields.map((field, index) => (
                                            <OpcServer
                                                key={field.id}
                                                id={index}
                                                removeServer={removeServer}
                                            />
                                        ))}
                                    </>
                                )
                            )
                            }

                            <footer className={styles.footer}>
                                <div className='wrapper'>
                                    <button type='button'
                                        className='btn-green mr-10'
                                        onClick={addServer}
                                        disabled={isButtonsDisabled}
                                    >Добавить сервер</button>
                                    <button type='submit'
                                        className='btn-green'
                                        disabled={isButtonsDisabled}
                                    >Отправить</button>
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