import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Table, Flex, Form, Input, Button } from 'antd';
import DropDown from '../../components/drop-down/drop-down';
import { useLocation } from 'react-router-dom';
import styles from './profile-editor.module.css';

const ProfileEditor = () => {

    const location = useLocation();
    const { processes, availableProfiles } = useSelector(state => state.profile);
    const [editableProsses, setEditableProsses] = useState(null);
    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        setEditableProsses(processes);
    }, [processes])

    const columns = [
        {
            title: 'Основной (IP:PORT)',
            dataIndex: 'main',
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item name="main">
                            <Input></Input>
                        </Form.Item>
                    )
                } else {
                    return <div>{text}</div>
                }
            }
        },
        {
            title: 'Резервный (IP:PORT)',
            dataIndex: 'second',
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item name="second">
                            <Input></Input>
                        </Form.Item>
                    )
                } else {
                    return <div>{text}</div>
                }
            }
        },
        {
            title: 'Действия',
            render: (_, record) => {
                return (
                    <Flex gap={'middle'}>
                        <Button>
                            <EditOutlined
                                style={{ fontSize: 22, cursor: 'pointer' }}
                                onClick={() => {
                                    setEditingRow(record.id);
                                    form.setFieldsValue({
                                        main: record.main,
                                        second: record.second,
                                    })
                                }} />
                        </Button>
                        <Button htmlType='submit'>
                            <SaveOutlined
                                style={{ fontSize: 22, cursor: 'pointer' }}
                            />
                        </Button>
                    </Flex>
                )
            }
        }
    ]

    const onFinish = (values) => {
        const updatedDataSource = [...editableProsses];
        updatedDataSource.splice(editingRow, 1, {...values, id: editingRow})
        setEditableProsses(updatedDataSource);
        setEditingRow(null);
    }


    return (
        <div className='text'>
            <div className={styles.chooseProfile}>
                <div className='text_type_main mr-4'>Выберитое профиль:</div>
                <DropDown
                    availableProfiles={availableProfiles}
                    currentProfile={location.state.profile ? location.state.profile : null} />
            </div>

            <div className={`mt-4 ${styles.profileEditor}`}>
                <div className='ml-8 mb-8'>Редактор профилей</div>
                <Form form={form} onFinish={onFinish}>
                    <Table
                        dataSource={editableProsses}
                        columns={columns}
                        pagination={{
                            defaultCurrent: 1,
                            pageSize: 5,
                        }}
                    />
                </Form>
            </div>

        </div>
    );
}

export default ProfileEditor;
