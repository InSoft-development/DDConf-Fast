import React, { useEffect } from 'react';
import styles from './opc-ua.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOpcUaForm, sendOpcUaForm } from '../../services/actions/opc-ua';
import { Flex, Divider, Spin, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useForm, useFieldArray } from 'react-hook-form';
import AuthSection from '../../components/form-elements/opc-ua/auth-section';
import SubscriptionsSection from '../../components/form-elements/opc-ua/subscriptions-section';
import UrlSection from '../../components/form-elements/opc-ua/url-section';

const OpcUa = () => {

    const [messageApi, messageHolder] = message.useMessage();
    const dispatch = useDispatch();
    const { form, getFormRequest, sendFormRequestSuccess } = useSelector(store => store.opcua);

    const { register, handleSubmit, control, unregister, setValue, reset } = useForm({
        shouldUnregister: true
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'servers'
    })

    useEffect(() => {
        dispatch(getOpcUaForm())
    }, [dispatch])

    useEffect(() => {
        reset(form)
    }, [reset, form])

    useEffect(() => {
        if (sendFormRequestSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Данные успешно получены сервером'
            })
        }
    }, [messageApi, sendFormRequestSuccess])

    const onSubmit = (data) => {
        dispatch(sendOpcUaForm(data))
    }

    return (
        <>
            {messageHolder}
            {getFormRequest ? (
                <Flex
                    align='center'
                    className='text text_type_main mt-10'
                >
                    <span className=' ml-10 mr-10'>Идёт загрузка формы</span>
                    <Spin></Spin>
                </Flex>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}>
                    {/* restore */}
                    <div className={styles.restore}>
                        <label htmlFor="restore" className='text_bold mr-10 ml-10'>Восстановить соединение после падения</label>
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
                                        className={`btn-red btn-round ${styles.serverDeleteBtn}`}
                                        onClick={e => remove(index)}
                                    >
                                        <DeleteOutlined />
                                    </button>
                                    {/* URL's */}
                                    <div className={styles.serverInputsRows}>
                                        <UrlSection
                                            index={index}
                                            register={register}
                                            control={control}
                                        />
                                        <Divider />
                                        {/* Authorization Type */}
                                        <Flex align='center' justify='space-between'>
                                            <label
                                                htmlFor={`servers.${index}.utoken_type`}
                                                className='fw-b '
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
                                        <AuthSection
                                            register={register}
                                            index={index}
                                            control={control}
                                            unregister={unregister}
                                            setValue={setValue}
                                        />
                                        <Divider />
                                        {/* Security Policy */}
                                        <Flex align='center' justify='space-between'>
                                            <label
                                                htmlFor={`servers.${index}.secpolicy`}
                                                className='fw-b '
                                            >Политика безопасности:</label>
                                            <select
                                                defaultValue={'none'}
                                                id={`servers.${index}.secpolicy`}
                                                {...register(`servers.${index}.secpolicy`)}
                                                className='opc-input'
                                            >
                                                <option value="none">None</option>
                                                <option value="Basic256Sha256 - Sign">Basic256Sha256 - Sign</option>
                                                <option value="Basic256Sha256 - Sign & Encrypt">Basic256Sha256 - Sign & Encrypt</option>
                                                <option value="Aes128_Sha256_RsaOaep - Sign">Aes128_Sha256_RsaOaep - Sign</option>
                                                <option value="Aes128_Sha256_RsaOaep - Sign & Encrypt">Aes128_Sha256_RsaOaep - Sign & Encrypt</option>
                                                <option value="Aes256_Sha256_RsaPss - Sign">Aes256_Sha256_RsaPss - Sign</option>
                                                <option value="Aes256_Sha256_RsaPss - Sign & Encrypt">Aes256_Sha256_RsaPss - Sign & Encrypt</option>
                                            </select>
                                        </Flex>
                                        <Flex align='center' justify='space-between'>
                                            <label
                                                htmlFor={`servers.${index}.mesmode`}
                                                className='fw-b'
                                            >Режим шифрования <br /> сообщений:</label>
                                            <select
                                                defaultValue={'none'}
                                                id={`servers.${index}.mesmode`}
                                                {...register(`servers.${index}.mesmode`)}
                                                className='opc-input'
                                            >
                                                <option value="none">None</option>
                                                <option value="Sign">Sign</option>
                                                <option value="Sign & Encrypt">Sign & Encrypt</option>
                                            </select>
                                        </Flex>
                                        <Divider />
                                        {/* Subscriptions */}
                                        <SubscriptionsSection
                                            register={register}
                                            index={index}
                                            control={control}
                                            unregister={unregister}
                                            setValue={setValue}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <footer className={`mt-10 ${styles.formFooter}`}>
                        <div className=' mt-10 mb-10 wrapper'>
                            <button type="button"
                                className="btn-green mr-4"
                                onClick={e => append({
                                    url1: '',
                                    url2_exists: false,
                                    utoken_type: "anonymous",
                                    secpolicy: "None",
                                    mesmode: "None",
                                    subscriptions: [{
                                        interval: 0,
                                        items: ''
                                    }]
                                })}
                            >Добавить сервер</button>
                            <button type="submit" className='btn-green'>Отправить</button>
                        </div>
                    </footer>
                </form>
            )}
        </>
    )

}

export default OpcUa;

