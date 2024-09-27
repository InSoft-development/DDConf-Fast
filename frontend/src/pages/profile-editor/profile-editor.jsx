import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex, Table, Divider, Modal } from 'antd';
import Column from 'antd/es/table/Column';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './profile-editor.module.css';
import DropDown from '../../components/drop-down/drop-down';
import {
    initialize,
    profileApply,
    saveProfile,
    changeProfile,
    deleteProfile,
    SET_DEFAULT_SLICE_STATE
} from '../../services/actions/profile-editor';
import classNames from 'classnames';
import { isProfileNameValid } from '../../utils/isProfileNameValid';


const ProfileEditor = () => {

    const [saveAsProfileName, setSaveAsProfileName] = useState('');
    const [createProfileName, setCreateProfileName] = useState('');

    const [saveAsModalIsOpen, setSaveAsProfileModalIsOpen] = useState(false);
    const [createProfileModalIsOpen, setCreateProfileModalIsOpen] = useState(false);
    const [deleteProfileModalIsOpen, setDeleteProfileModalIsOpen] = useState(false);


    const [formValues, setFormValues] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        table,
        selectedProfile,
        availableProfiles,
        activeProfile
        
    } = useSelector(store => store.profileEditor);

    const isAvailable = true;

    useEffect(() => {
        dispatch(initialize({
            isActive: true
        }));

        return () => {
            dispatch({ type: SET_DEFAULT_SLICE_STATE })
        }
    }, [])

    useEffect(() => {
        setFormValues(table)
    }, [table])

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

    // +
    const onOptionListClickHandler = (option) => {
        dispatch(changeProfile(option))
    }

    // +
    const onApplyClickHandler = (e) => {

        const callee = () => {
            dispatch(profileApply(selectedProfile, () => {
                dispatch(initialize({
                    previous: true
                }))
            }))
        }

        dispatch(saveProfile({
            name: selectedProfile,
            data: formValues
        }, callee))
    }

    // +
    const onSaveBtnClickHandler = (e) => {

        const callee = () => {
            dispatch(initialize({
                previous: true
            }))
        }

        dispatch(saveProfile({
            name: selectedProfile,
            data: formValues,
        }, callee))
    }

    // +
    const onSaveAsBtnClickHandler = (e) => {

        const isValid = isProfileNameValid(saveAsProfileName);

        const callee =  () => {
            dispatch(initialize({
                current: saveAsProfileName
            }))
        }

        if (isValid) {
            dispatch(saveProfile({
                name: saveAsProfileName,
                data: formValues
            }, callee))

            setSaveAsProfileModalIsOpen(false);
            setSaveAsProfileName('');
        }
    }

    // +
    const onCreateProfileBtnClickHandler = (e) => {

        const isValid = isProfileNameValid(createProfileName);

        const callee = () => {
            dispatch(initialize({
                current: createProfileName
            }))
        }

        if (isValid) {
            dispatch(saveProfile({
                name: createProfileName,
                data: []
            }, callee))

            setCreateProfileModalIsOpen(false);
            setCreateProfileName('');
        }

    }

    const onDeleteProfileBtnClickHandler = (e) => {

        const callee = () => {
            dispatch(initialize({
                isNew: true
            }))
        }

        dispatch(deleteProfile(selectedProfile, callee));

        setDeleteProfileModalIsOpen(false);
    }

    return (
        <>
            <div className={styles.profileEditorWrapper}>
                <Flex align='center' justify='space-between'>
                    <Flex align='center' justify='flex-start'>
                        <h2 className='text text_type_main mr-10'>Редактор профилей</h2>
                        {/* {activeProfileRequest && (
                            <LoadingOutlined style={{ fontSize: 20 }} />
                        )} */}

                        {true && (
                            <DropDown
                                selectedOption={selectedProfile}
                                availableOptions={availableProfiles}
                                onClick={onOptionListClickHandler}
                                activeOption={activeProfile}
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
                            >Добавить процесс</button>
                            <div>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сделать выбранный профиль активным'
                                    onClick={onApplyClickHandler}
                                >Применить</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сохранить изменения профиля'
                                    onClick={onSaveBtnClickHandler}
                                >Сохранить</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Сохранить изменения в новый профиль'
                                    onClick={e => setSaveAsProfileModalIsOpen(true)}
                                >Сохранить как</button>
                                <button
                                    type="button"
                                    className={`button btn-green mr-2 ${isAvailable}`}
                                    title='Создать новый профиль'
                                    onClick={e => setCreateProfileModalIsOpen(true)}
                                >Создать профиль</button>
                                <button
                                    type="button"
                                    className={`button btn-red mr-2 ${isAvailable}`}
                                    onClick={e => setDeleteProfileModalIsOpen(true)}
                                    title='Удалить профиль'
                                >Удалить</button>
                                <button
                                    type="button"
                                    className={`button btn-grey ${isAvailable}`}

                                    title={'Вернуть изначальное состояние формы'}
                                >Отменить</button>
                            </div>
                        </Flex>
                    </footer>
                </form>
            </div>
            {/* Модалка | Сохранение профиля */}
            <Modal
                title={`Сохранить профиль "${selectedProfile}" как`}
                centered={true}
                open={saveAsModalIsOpen}
                okButtonProps={{
                    style: {
                        backgroundColor: 'var(--green)'
                    }
                }}
                okText='Сохранить и отправить'
                cancelText='Отменить'
                onCancel={e => setSaveAsProfileModalIsOpen(false)}
                onOk={onSaveAsBtnClickHandler}

            >
                <Flex align='center' justify='space-between' className='mt-20 mb-20'>
                    <label htmlFor="newProfile">Профиль: </label>
                    <input
                        id='newProfile'
                        autoComplete='off'
                        placeholder='Введите название профиля'
                        className='input'
                        type="text"
                        value={saveAsProfileName}
                        onChange={e => {
                            setSaveAsProfileName(e.target.value)
                        }}
                    />
                </Flex>
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
                onCancel={e => { setCreateProfileModalIsOpen(false) }}
                onOk={onCreateProfileBtnClickHandler}

            >
                <Flex align='center' justify='space-between' className='mt-10 mb-10'>
                    <label htmlFor="createProfileInput" className='mr-10' style={{ width: 160 }}>Название профиля:</label>
                    <input type="text"
                        name="createProfileInput"
                        id="createProfileInput"
                        autoComplete='off'
                        placeholder='Введите название нового профиля'
                        className='input'
                        value={createProfileName}
                        onChange={e => {
                            setCreateProfileName(e.target.value)
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
                onOk={onDeleteProfileBtnClickHandler}

            >
                <div className='text'>
                    <span className='fw-b'>Внимание: </span>
                    <span>вы пытаетесь удалить профиль, это действие будет необратимо. Если вы действительно хотите удалить этот профиль, нажмите 'Удалить', для отмены нажмите 'Отменить'.</span>
                </div>
            </Modal>

        </>
    );
}

export default ProfileEditor;
