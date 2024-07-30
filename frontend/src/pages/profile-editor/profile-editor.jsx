import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile-editor.module.css';
import { Flex, Table, Form} from 'antd';
import DropDown from '../../components/drop-down/drop-down';
import { editColumns } from '../../utils/table-description';
import { getProcessesByProfile } from '../../services/actions/profile';
import { ADD_NEW_PROCESS, SET_EDITABLE_ROW_ID, CHANGE_TABLE_CELL} from '../../services/actions/profile';


const ProfileEditor = () => {

    const dispatch = useDispatch();
    const {
        availableProfiles,
        editableProcesses
    } = useSelector(state => state.profile);

    const [form] = Form.useForm()

    const onProfileClickHandler = (profile) => {
        dispatch(getProcessesByProfile(profile, true))
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

    return (
        <div className={styles.profileEditor}>
            <header className='text text_type_main'>Редактор профилей</header>
            <main>
                <Flex justify='space-between' className='mb-10'>
                    <DropDown availableProfiles={availableProfiles} onClick={onProfileClickHandler}/>
                    <button className='button btn-green ml-10'>Новый</button>
                </Flex>
                <Form form={form} onFieldsChange={onFieldsChange}>
                    <Table
                        rowKey={(record) => record.id}
                        columns={editColumns}
                        dataSource={editableProcesses}
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
                    <button className='button btn-red mr-4'>Применить</button>
                    <button className='button btn-purple mr-4'>Удалить</button>
                    <button className='button btn-purple mr-4'>Сохранить</button>
                    <button className='button btn-purple mr-4'>Сохранить как</button>
                    <button className='button btn-grey'>Отменить</button>
                </Flex>
            </footer>
        </div>
    );
}

export default ProfileEditor;
