import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile-editor.module.css';
import { Flex, Table, Form, Modal, Input} from 'antd';
import DropDown from '../../components/drop-down/drop-down';
import { editColumns } from '../../utils/table-description';
import { getTableByProfileName, profileSave } from '../../services/actions/profile';
import { 
    ADD_NEW_PROCESS, 
    SET_EDITABLE_ROW_ID, 
    CHANGE_TABLE_CELL, 
    SET_EDITABLE_PROFILE,
    RESET_EDITABLE_ROW_ID,
    CHANGE_TABLE_COMMENT
} from '../../services/actions/profile';
import { CLOSE_COMMENT_EDITOR } from '../../services/actions/modals';


const ProfileEditor = () => {

    const dispatch = useDispatch();
    const {
        activeProfile,
        availableProfiles,
        editableProfile,
        editableTable,
        editableTableRequest,
    } = useSelector(state => state.profile);
    const {commentEditorIsOpen} = useSelector(state => state.modals)

    const [form] = Form.useForm();
    const [editableComment, setEditableComment] = useState('');

    useEffect(() => {
        if(activeProfile !== null){
            dispatch({
                type: SET_EDITABLE_PROFILE,
                payload: activeProfile
            })
            dispatch(getTableByProfileName(activeProfile))
        }
    }, [])

    useEffect(() => {
        const onEnterPressHandler = (e) => {
            if(e.key === 'Enter'){
                dispatch({type: RESET_EDITABLE_ROW_ID})
            }
        }

        document.addEventListener('keydown', onEnterPressHandler);

        return () => {
            document.removeEventListener('keydown', onEnterPressHandler);
        }
    }, [])


    const onProfileClickHandler = (profile) => {
        dispatch({
            type: SET_EDITABLE_PROFILE,
            payload: profile
        })
        dispatch(getTableByProfileName(profile))
    }

    const onAddProcessBtnClickHandler = (e) => {
        dispatch({type: ADD_NEW_PROCESS})
    }

    const setEditableRow = (record) => {
        dispatch({
            type: SET_EDITABLE_ROW_ID,
            payload: record,
        })
    }

    const onFieldsChange = (changedFields) => {
        const {value, name} = changedFields[0];

        dispatch({
            type: CHANGE_TABLE_CELL,
            payload: {
                field: name.shift(),
                value,
            }
        })
    }

    const onClsBtnClickHandler = () => {
        dispatch({
            type: CLOSE_COMMENT_EDITOR
        })
    }

    const onModalSaveBtnClickHandler = (e) => {
        dispatch({
            type: CHANGE_TABLE_COMMENT,
            payload: editableComment
        })
        onClsBtnClickHandler();
        setEditableComment('');
    }

    return (
        <>
        <div className={styles.profileEditor}>
            <header className='text text_type_main'>Редактор профилей</header>
            <main>
                <Flex justify='space-between' className='mb-10'>
                    <DropDown 
                        currentProfile={editableProfile} 
                        availableProfiles={availableProfiles} 
                        onClick={onProfileClickHandler}/>
                    <button className='button btn-green ml-10'>Новый</button>
                </Flex>
                <Form form={form} onFieldsChange={onFieldsChange}>
                    <Table
                        rowKey={(record) => record.id}
                        columns={editColumns}
                        dataSource={editableTable}
                        loading={editableTableRequest}
                        expandable={{
                            expandedRowRender: (record) => (
                                <div>{record.comment}</div>
                            )
                        }}
                        onRow={(record) => {
                            return {
                                onClick: (e) => {
                                    setEditableRow(record);
                                    form.setFieldsValue({
                                        main: record.main,
                                        second: record.second
                                    })
                                }
                            }
                        }}
                    />
                </Form>
                <button className='button btn-green'
                        onClick={onAddProcessBtnClickHandler}
                >Добавить процесс</button>

            </main>
            <footer>
                <Flex justify='flex-end'>
                    <button className='button btn-green mr-4'
                            onClick={e => dispatch(profileSave(editableProfile, editableTable))}
                    >Применить</button>
                    {/* <button className='button btn-purple mr-4'>Удалить</button>
                    <button className='button btn-purple mr-4'>Сохранить</button>
                    <button className='button btn-purple mr-4'>Сохранить как</button> */}
                    {/* <button className='button btn-grey'>Отменить</button> */}
                </Flex>
            </footer>
        </div>
        <Modal 
            title="Введите комментарий" open={commentEditorIsOpen}
            onCancel={onClsBtnClickHandler}
            centered
            footer={[
                <button
                    key='close'
                    className='button btn-outlined'
                    onClick={onClsBtnClickHandler}
                    >Закрыть окно</button>,
                <button 
                    key='save'
                    className='button btn-green ml-4'
                    onClick={onModalSaveBtnClickHandler}
                    >Сохранить</button>
            ]}
            >
            <div className='mt-20 mb-20'>
                <Input.TextArea
                    style={{minHeight: 100}}
                    placeholder='Введите комментарий'
                    value={editableComment}
                    onChange={e => setEditableComment(e.target.value)}
                >
                </Input.TextArea>
            </div>
        </Modal>
        </>
    );
}

export default ProfileEditor;
