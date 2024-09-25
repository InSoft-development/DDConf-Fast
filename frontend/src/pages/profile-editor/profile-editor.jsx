import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex, Table, Divider, Modal, message } from 'antd';
import Column from 'antd/es/table/Column';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './profile-editor.module.css';
import DropDown from '../../components/drop-down/drop-down';
import {
    getProfiles,
    getTableByProfileName,
    changeProfile,
    saveProfile,
    profileApply,
    deleteProfile,
    SET_DEFAULT_SLICE_STATE
} from '../../services/actions/profile-editor';
import classNames from 'classnames';
import { uniqueValues } from '../../utils/uniqueValues';

const ProfileEditor = () => {

    const [newProfileName, setNewProfileName] = useState('');
    const [newlyProfileName, setNewlyProfileName] = useState('');
    const [saveProfileModalIsOpen, setSaveProfileModalIsOpen] = useState(false);
    const [deleteProfileModalIsOpen, setDeleteProfileModalIsOpen] = useState(false);
    const [createProfileModalIsOpen, setCreateProfileModalIsOpen] = useState(false);

    const [formValues, setFormValues] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        selectedProfile,
        availableProfiles,
        activeProfileRequest,
        activeProfileRequestSuccess,
        table,
        tableRequest,
        tableRequestSuccess,
        profileSaveRequest,
        applyProficeRequest,
        deleteProfileRequest,
        activeProfileRequestFailed,
        tableRequestFailed
    } = useSelector(store => store.profileEditor);

    const formIsUploading = profileSaveRequest ||
        activeProfileRequest ||
        tableRequest ||
        applyProficeRequest ||
        deleteProfileRequest;

    const failedRequest = activeProfileRequestFailed || tableRequestFailed;

    const isAvailable = classNames({
        'btn-inactive': formIsUploading || failedRequest,
    })

    useEffect(() => {
        dispatch(getProfiles());

        return () => {
            dispatch({type: SET_DEFAULT_SLICE_STATE})
        }
    }, [])

    useEffect(() => {
        if (activeProfileRequestSuccess) {
            dispatch(getTableByProfileName(selectedProfile))
        }

    }, [activeProfileRequestSuccess])

    useEffect(() => {
        if (tableRequestSuccess) {
            setFormValues(table)
        }

    }, [tableRequestSuccess])

    // form handlers
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    const addRow = (e) => {
        const newFormValues = [...formValues, {
            id: formValues.length,
            main: null,
            second: null,
            comment: null
        }]

        setFormValues(newFormValues);
    }

    const removeRow = (index) => {
        const newFormData = [...formValues]
            .filter((_, rowId) => rowId !== index)
            .map((row, index) => {
                return {
                    ...row,
                    id: index
                }
            })

        setFormValues(newFormData)

    }

    const changeCellValue = (e) => {
        const newValue = e.target.value;
        const [index, fieldName] = e.target.id.split('.');

        const newFormValues = [...formValues].map(row => {

            if (row.id === Number(index)) {
                return {
                    ...row,
                    [fieldName]: newValue
                }
            }

            return row;
        })
        setFormValues(newFormValues);
    }

    const onReturnBtnClickHandler = (e) => {
        navigate('/dd104');
    }

    // profile handlers

    const onOptionListClickHandler = (option) => {
        dispatch(changeProfile(option))
    }

    const onSaveProfileHandler = () => {
        const profileData = {
            name: selectedProfile,
            data: formValues
        }

        dispatch(saveProfile(profileData));
    }

    const onSaveAsProfileHandler = (newlyProfile = false, cb = null) => {
        const profileData = {
            name: newlyProfile ? newlyProfileName : newProfileName,
            data: newlyProfile ? [] : formValues
        }      

        // Определяем запрещённые символы, недопустимые для элементов файлоых систем OC
        //eslint-disable-next-line
        const regExp = /[\&\;\|\*\?\'\"\`\[\]\(\)\$\<\>\{\}\^\#\/\%\!\\]/g;

        const matches = profileData.name.match(regExp);

        if (profileData.name.length === 0) {
            message.open({
                type: 'warning',
                content: 'Название профиля не может быть пустым',
                duration: 2
            })
            return;
        }

        if (matches !== null) {
            message.open({
                type: 'warning',
                content: `В названии профиля не могут содержаться следующие символы: ${uniqueValues(matches).join(' ')}`,
                duration: 5
            })
            return;
        }

        dispatch(saveProfile(profileData, cb));
        setNewProfileName('');
        setNewlyProfileName('');
        setSaveProfileModalIsOpen(false);
        setCreateProfileModalIsOpen(false)

    }

    const onApplyProfileHandler = () => {
        dispatch(profileApply(selectedProfile));
    }

    const onCancelProfileHandler = () => {
        dispatch(getTableByProfileName(selectedProfile))
    }

    return (
        <>
            <div className={styles.profileEditorWrapper}>
                <Flex align='center' justify='space-between'>
                    <Flex align='center' justify='flex-start'>
                        <h2 className='text text_type_main mr-10'>Редактор профилей</h2>
                        {activeProfileRequest && (
                            <LoadingOutlined style={{ fontSize: 20 }} />
                        )}

                        {activeProfileRequestSuccess && (
                            <DropDown
                                selectedOption={selectedProfile}
                                availableOptions={availableProfiles}
                                loading={activeProfileRequest}
                                onClick={onOptionListClickHandler}
                            />
                        )}
                    </Flex>
                    <button type="button" className='button btn-green no-select' onClick={onReturnBtnClickHandler}>Выйти из режима редактирования</button>
                </Flex>
                <Divider />
                <form onSubmit={onSubmit}>
                    <div className={styles.tableWrapper}>
                        <Table
                            rowKey={(record) => record.id}
                            bordered={true}
                            dataSource={formValues}
                            pagination={false}
                            loading={formIsUploading}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <textarea
                                        resize={'vertical'}
                                        autoComplete='off'
                                        placeholder='Введите комментарий'
                                        className={styles.textArea}
                                        id={`${record.id}.comment`}
                                        name={`${record.id}.comment`}
                                        onChange={e => changeCellValue(e)}
                                        value={formValues[record.id].comment || ''}
                                    />
                                )
                            }}
                        >
                            <Column
                                width={'10%'}
                                title={'Процесс'}
                                dataIndex={'id'}
                                key={'id'}
                                render={(text) => (
                                    <div className='text'>{text + 1}</div>
                                )}
                            />
                            <Column
                                width={'40%'}
                                title={'Основной (IP:PORT)'}
                                dataIndex={'main'}
                                key={'main'}
                                render={((_, __, index) => {
                                    return (
                                        <input
                                            className='text input_type_text'
                                            id={`${index}.main`}
                                            name={`${index}.main`}
                                            type='text'
                                            autoComplete='off'
                                            value={formValues[index].main || ''}
                                            onChange={e => changeCellValue(e)}
                                            placeholder='Введите основной IP'
                                        />
                                    )
                                })}
                            />
                            <Column
                                width={'40%'}
                                title={'Резервный (IP:PORT)'}
                                dataIndex={'second'}
                                key={'second'}
                                render={(_, __, index) => {
                                    return (
                                        <input
                                            className='text input_type_text'
                                            id={`${index}.second`}
                                            name={`${index}.second`}
                                            type='text'
                                            autoComplete='off'
                                            value={formValues[index].second || ''}
                                            onChange={e => changeCellValue(e)}
                                            placeholder='Введите резервный IP'
                                        />
                                    )
                                }}
                            />
                            <Column
                                width={'10%'}
                                title={'Действия'}
                                key={'actions'}
                                render={(_, __, index) => (
                                    <Flex align='center' justify='flex-start' key={`${index}.action`}>
                                        <div
                                            className={styles.iconWrapper}
                                            onClick={e => removeRow(index)}
                                        >
                                            <DeleteOutlined style={{ fontSize: 18 }} />
                                        </div>
                                    </Flex>
                                )}
                            />
                        </Table>
                    </div>

                    <footer className={styles.footer}>
                        <Flex align='center' justify='space-between' className='wrapper'>
                            <button type="button"
                                className={`button btn-green ${isAvailable}`}
                                onClick={addRow}
                                disabled={formIsUploading || failedRequest}
                            >Добавить процесс</button>
                            <div>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сделать выбранный профиль активным'
                                    disabled={formIsUploading || failedRequest}
                                    onClick={e => onApplyProfileHandler()}
                                >Применить</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сохранить изменения профиля'
                                    onClick={onSaveProfileHandler}
                                    disabled={formIsUploading || failedRequest}
                                >Сохранить</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сохранить изменения в новый профиль'
                                    disabled={formIsUploading || failedRequest}
                                    onClick={e => {
                                        setSaveProfileModalIsOpen(true)
                                    }}
                                >Сохранить как</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    disabled={formIsUploading || failedRequest}
                                    title='Создать новый профиль'
                                    onClick={e => setCreateProfileModalIsOpen(true)}
                                >Создать профиль</button>
                                <button
                                    type="button"
                                    className={`button btn-red mr-2 ${isAvailable}`}
                                    disabled={formIsUploading || failedRequest}
                                    onClick={e => setDeleteProfileModalIsOpen(true)}
                                    title='Удалить профиль'
                                >Удалить</button>
                                <button
                                    type="button"
                                    className={`button btn-grey ${isAvailable}`}
                                    disabled={formIsUploading || failedRequest}
                                    onClick={onCancelProfileHandler}
                                    title={'Вернуть изначальное состояние формы'}
                                >Отменить</button>
                            </div>
                        </Flex>
                    </footer>
                </form>
            </div>
            {/* Модалка | Сохранение профиля */}
            <Modal
                title={'Сохранить как'}
                centered={true}
                open={saveProfileModalIsOpen}
                okButtonProps={{
                    style: {
                        backgroundColor: 'var(--green)'
                    }
                }}
                okText='Сохранить и отправить'
                cancelText='Отменить'
                onCancel={e => setSaveProfileModalIsOpen(false)}
                onOk={e => {
                    const callee = () => {
                        dispatch(getProfiles())
                    }
                    onSaveAsProfileHandler(false, callee)
                }}

            >
                <Flex align='center' justify='space-between' className='mt-20 mb-20'>
                    <label htmlFor="newProfile">Профиль: </label>
                    <input
                        id='newProfile'
                        autoComplete='off'
                        placeholder='Введите название профиля'
                        className='input'
                        type="text"
                        value={newProfileName}
                        onChange={e => {
                            setNewProfileName(e.target.value)
                        }}
                    />
                </Flex>
            </Modal>
            {/* Модалка | Удаление профиля */}
            <Modal
                title={' '}
                centered={true}
                open={deleteProfileModalIsOpen}
                okButtonProps={{
                    style: {
                        backgroundColor: 'var(--red)'
                    }
                }}
                okText='Удалить'
                cancelText='Отменить'
                onCancel={e => setDeleteProfileModalIsOpen(false)}
                onOk={e => {
                    dispatch(deleteProfile(selectedProfile));
                    setDeleteProfileModalIsOpen(false)                 
                }}

            >
                <div className='text'>
                    <span className='fw-b'>Внимание: </span>
                    вы пытаетесь необратимо удалить активный профиль, все текущие процессы сервиса заданные данным профилем будут остановлены. Если вы действительно хотите удалить этот профиль, нажмите 'Удалить', для отмены нажмите 'Отменить'.
                </div>
            </Modal>
            {/* Модалка | Создание профиля */}
            <Modal
                title={'Создание нового профиля'}
                width={600}
                centered={true}
                open={createProfileModalIsOpen}
                okButtonProps={{
                    style: {
                        backgroundColor: 'var(--green)'
                    }
                }}
                okText='Создать'
                cancelText='Отменить'
                onCancel={e => {setCreateProfileModalIsOpen(false)}}
                onOk={e => {
                    const callee = () => {
                        dispatch(getProfiles())
                    }

                    onSaveAsProfileHandler(true, callee)
                }}

            >
                <Flex align='center' justify='space-between' className='mt-10 mb-10'>
                    <label htmlFor="createProfileInput" className='mr-10' style={{width: 160}}>Название профиля:</label>
                    <input type="text"
                        name="createProfileInput"
                        id="createProfileInput"
                        autoComplete='off'
                        placeholder='Введите название нового профиля'
                        className='input'
                        value={newlyProfileName}
                        onChange={e => {                            
                            setNewlyProfileName(e.target.value)
                        }}
                      />
                </Flex>

            </Modal>
        </>
    );
}

export default ProfileEditor;
