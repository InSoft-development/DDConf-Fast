import React, { useEffect, useState } from 'react';
import { Flex, Table, Divider } from 'antd';
import Column from 'antd/es/table/Column';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './profile-editor.module.css';
import DropDown from '../../components/drop-down/drop-down';

import { dataSource } from '../../utils/mock';

const ProfileEditor = () => {

    const [formValues, setFormValues] = useState([]);

    useEffect(() => {
        setFormValues(dataSource)
    }, [])

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

    return (
        <div className={styles.profileEditorWrapper}>
            <Flex align='center' justify='flex-start'>
                <h2 className='text text_type_main mr-10'>Редактор профилей</h2>
                <DropDown />
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
                            <button type="button" className='button btn-green mr-2' title='Сохранить изменения профиля и сделать его активным'>Применить</button>
                            <button type="button" className='button btn-green mr-2' title='Сохранить изменения профиля'>Сохранить</button>
                            <button type="button" className='button btn-green mr-2' title='Сохранить изменения в новый профиль'>Сохранить как</button>
                            <button type="button" className='button btn-red mr-2'>Удалить</button>
                            <button type="button" className='button btn-grey'>Отменить</button>
                            {/* <button type="submit" className='button btn-green mr-2'>Отправить</button> */}
                        </div>
                    </Flex>
                </footer>
            </form>
        </div>
    );
}

export default ProfileEditor;
