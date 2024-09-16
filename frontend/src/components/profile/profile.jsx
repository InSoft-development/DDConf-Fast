import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './profile.module.css';
import {logs } from '../../utils/mock';
import { columns } from '../../utils/table-description';
import DropDown from '../drop-down/drop-down';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

    const navigate = useNavigate();
    const { activeProfile,
        availableProfiles,
        processes,
        profileRequest,
        profileSuccess } = useSelector(state => state.profile);
    const [logIsOpened, setLog] = useState(false);

    const onLogBtnClickHandler = () => {
        setLog(!logIsOpened);
    }

    const profileContent = profileRequest ?
        (<LoadingOutlined style={{ fontSize: 32 }} />)
        : profileSuccess ? (
            <>
                <div className={styles.workProfile}>
                    <div className={styles.profileMenu}>
                        <div className={`text text_type_main ${styles.currentProfile}`}>Рабочий профиль:</div>
                        <DropDown currentProfile={activeProfile} availableProfiles={availableProfiles} />
                    </div>
                    <button className='button btn-green' onClick={() => navigate('/profile-editor', {state: {profile: activeProfile}})}>Редактировать</button>
                </div>
                <Table
                    rowKey={(record) => record.id}
                    dataSource={processes}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div>{record.comment}</div>
                        )
                    }}
                    columns={columns}
                    pagination={{
                        defaultCurrent: 1,
                        pageSize: 5,
                    }}
                    bordered={true}
                />
                <div className={styles.btnPanel}>
                    <div className={styles.panelLeftSide}>
                        <button className='button btn-blue'>Запустить всё</button>
                        <button className='button btn-blue'>Остановить всё</button>
                    </div>
                    <button className={`button ${logIsOpened ? 'btn-inactive' : 'btn-purple'}`} onClick={onLogBtnClickHandler}>Открыть log</button>
                </div>
                {logIsOpened && (
                    <ul className={`text_log ${styles.logWrapper}`}>
                        {logs.map(log => (
                            <li>{log}</li>
                        ))}
                    </ul>
                )}
            </>
        ) : (
            <div>Ошибка</div>
        )


    return (
        <div className={styles.profile}>
            {profileContent}
        </div>
    );
}

export default Profile;
