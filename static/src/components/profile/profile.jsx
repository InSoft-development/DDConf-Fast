import React from 'react';
import { Table } from 'antd';
import styles from './profile.module.css';
import { dataSource, columns } from '../../utils/mock';

const Profile = () => {

    const profileName = 'Название профиля';

    return (
        <div className={styles.profile}>
            <div className={styles.workProfile}>
                <div className='text text_type_main'>Рабочий профиль: 
                    <span className='text_color_inactive'> {profileName}</span>
                </div>
                <button className='button btn-green'>Профиль</button>
            </div>
            <Table
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
            />
            <div className={styles.btnPanel}>
                <div className={styles.panelLeftSide}>
                    <button className='button btn-blue'>Запустить всё</button>
                    <button className='button btn-blue'>Остановить всё</button>
                </div>
                <button className='button btn-purple'>Открыть log</button>
            </div>
        </div>
    );
}

export default Profile;
