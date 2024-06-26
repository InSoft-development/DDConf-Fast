import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './dd104.module.css';
import { logs } from '../../utils/mock';
import { columns } from '../../utils/table-description';
import DropDown from '../../components/drop-down/drop-down';
import { useNavigate } from 'react-router-dom';
import { getProfiles } from '../../services/actions/profile'


const Dd104 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profileRequest, 
        activeProfile, 
        availableProfiles,
        processes,
        processRequest
    } = useSelector(state => state.profile);
    const [logIsOpened, setLog] = useState(false);

    const onLogBtnClickHandler = () => {
        setLog(!logIsOpened);
    }

    useEffect(() => {
        dispatch(getProfiles());
    }, [])

    return (
        <div className={styles.profile}>
            <div className={styles.workProfile}>
                <div className={styles.profileMenu}>
                    <div className={`text text_type_main ${styles.currentProfile}`}>Рабочий профиль:</div>
                    {profileRequest ? (
                        <LoadingOutlined style={{ fontSize: 20 }} />
                    ) : (
                        <DropDown currentProfile={activeProfile} availableProfiles={availableProfiles} />
                    )}

                </div>
                {/* <button className='button btn-green' onClick={() => navigate('/profile-editor', { state: { profile: activeProfile } })}>Редактировать</button> */}
            </div>
            <Table
                rowKey={(record) => record.id}
                loading={processRequest}
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
        </div>
    );
}

export default Dd104;
