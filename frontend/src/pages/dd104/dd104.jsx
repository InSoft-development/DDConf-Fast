import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './dd104.module.css';
import { columns } from '../../utils/table-description';
import DropDown from '../../components/drop-down/drop-down';
import { getProfiles, getActiveTable } from '../../services/actions/profile';
import { changeProсess, changeProfile } from '../../services/actions/profile';
import { useNavigate } from 'react-router-dom';


const Dd104 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        profileRequest,
        activeProfile,
        availableProfiles,
        activeTable,
        changeProfileRequest,
        activeTableRequest
    } = useSelector(state => state.profile);


    useEffect(() => {
        dispatch(getActiveTable())
    }, [])

    const onStartAllBtnClickHandler = () => {
        dispatch(changeProсess('start', activeTable.map((_, index) => index)))
    }

    const onStopAllBtnClickHandler = () => {
        dispatch(changeProсess('stop', activeTable.map((_, index) => index)))
    }

    const onProfileClickHandler = (profile) => {
        dispatch(changeProfile(profile))
    }

    return (
        <div className={styles.profile}>
            <div className={styles.header}>
                <div className={`text text_type_main mr-10`}>Рабочий профиль:</div>
                {profileRequest ? (
                    <LoadingOutlined style={{ fontSize: 20 }} />
                ) : (
                    <>
                        <DropDown
                            currentProfile={activeProfile}
                            availableProfiles={availableProfiles}
                            loading={changeProfileRequest}
                            onClick={onProfileClickHandler}
                        />
                        <button className='button btn-green ml-auto'
                            onClick={e => { navigate('/profile-editor', {state: {prevProfile: activeProfile}}) }}
                        >Редактировать профиль</button>
                    </>
                )}

            </div>
            <div className={styles.tableWrapper}>
                <Table
                    rowKey={(record) => record.id}
                    loading={activeTableRequest}
                    dataSource={activeTable}
                    pagination={false}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div>{record.comment}</div>
                        )
                    }}
                    columns={columns}
                    bordered={true}
                />
            </div>
            <footer className={styles.footer}>
                <Flex justify='space-between' className='wrapper'>
                    <div>
                        <button className='button btn-blue mr-10'
                            onClick={onStartAllBtnClickHandler}
                        >Запустить всё</button>
                        <button className='button btn-blue'
                            onClick={onStopAllBtnClickHandler}
                        >Остановить всё</button>
                    </div>
                    <button className='button btn-purple'>Открыть log</button>
                </Flex>
            </footer>

        </div>
    );
}

export default Dd104;
