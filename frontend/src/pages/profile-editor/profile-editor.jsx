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
} from '../../services/actions/profile-editor';
import classNames from 'classnames';
import { uniqueValues } from '../../utils/uniqueValues';

const ProfileEditor = () => {

    const [newProfileName, setNewProfileName] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        applyProficeRequest
    } = useSelector(store => store.profileEditor);

    const formIsUploading = profileSaveRequest || activeProfileRequest || tableRequest || applyProficeRequest;

    const isAvailable = classNames({
        'btn-inactive': formIsUploading,
    })


    useEffect(() => {
        dispatch(getProfiles());
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

    const onSaveAsProfileHandler = () => {
        const profileData = {
            name: newProfileName,
            data: formValues
        }

        // Определяем запрещённые символы, недопустимые для элементов файлоых систем OC
        //eslint-disable-next-line
        const regExp = /[\&\;\|\*\?\'\"\`\[\]\(\)\$\<\>\{\}\^\#\/\%\!\\]/g;

        const matches = profileData.name.match(regExp);     

        console.log(profileData.name.length);
        
        if (profileData.name.length === 0) {
            message.open({
                type: 'warning',
                content: 'Название профиля не может быть пустым',
                duration: 2
            })
            return;
        }
        
        if(matches !== null){          

            message.open({
                type: 'warning',
                content: `В названии профиля не могут содержаться следующие символы: ${uniqueValues(matches).join(' ')}`,
                duration: 5
            })
            return;
        }

        dispatch(saveProfile(profileData));
        setNewProfileName('');
        setModalIsOpen(false);

    }

    const onApplyProfileHandler = () => {
        dispatch(profileApply(selectedProfile));
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
                            loading={tableRequest || activeProfileRequest}
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
                                title={'Резервный'}
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
                            <button type="button" className='button btn-green' onClick={addRow}>Добавить</button>
                            <div>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сделать выбранный профиль активным'
                                    disabled={formIsUploading}
                                    onClick={e => onApplyProfileHandler()}
                                >Применить</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сохранить изменения профиля'
                                    onClick={onSaveProfileHandler}
                                    disabled={formIsUploading}
                                >Сохранить</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сохранить изменения в новый профиль'
                                    disabled={formIsUploading}
                                    onClick={e => {
                                        setModalIsOpen(true)
                                    }}
                                >Сохранить как</button>
                                <button
                                    type="button"
                                    className={`button btn-red mr-2 ${isAvailable}`}
                                    disabled={formIsUploading}
                                >Удалить</button>
                                <button
                                    type="button"
                                    className={`button btn-grey ${isAvailable}`}
                                >Отменить</button>
                            </div>
                        </Flex>
                    </footer>
                </form>
            </div>
            <Modal
                title={'Сохранить как'}
                centered={true}
                open={modalIsOpen}
                okButtonProps={{
                    style: {
                        backgroundColor: 'var(--green)'
                    }
                }}
                okText='Сохранить и отправить'
                cancelText='Отменить'
                onCancel={e => setModalIsOpen(false)}
                onOk={e => onSaveAsProfileHandler()}

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
        </>
    );
}

export default ProfileEditor;
