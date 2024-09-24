import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './dd104.module.css';
import { columns } from '../../utils/table-description';
import DropDown from '../../components/drop-down/drop-down';
import {
    getProfiles,
    getActiveTable,
    changeProfile,
    changeProсess
} from '../../services/actions/profile';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';


const Dd104 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        profileRequest,
        profileSuccess,
        activeProfile,
        availableProfiles,
        changeProfileRequest,
        activeTableRequest,
        activeTable,
        profileFailed
    } = useSelector(state => state.profile);


    useEffect(() => {
        const callee = () => {
            dispatch(getActiveTable())
        }

        dispatch(getProfiles(callee))

    }, [])

    const onStartAllBtnClickHandler = () => {
        dispatch(changeProсess('start', activeTable.map((_, index) => index)))
    }

    const onStopAllBtnClickHandler = () => {
        dispatch(changeProсess('stop', activeTable.map((_, index) => index)))
    }

    const onProfileClickHandler = (profile) => {
        const callee = () => {
            dispatch(getActiveTable())
        }

        dispatch(changeProfile(profile, callee))
    }

    const isDataUploading = activeTableRequest ||
        profileRequest || 
        changeProfileRequest;
        
    const btnStyles = classnames({'btn-inactive ': isDataUploading})

    const headerContent = () => {      

        return (
            <>
                <Flex align='center' justify='flex-start'>
                    <h2 className={`text text_type_main mr-10`}>Рабочий профиль:</h2>
                    {profileRequest && (
                        <LoadingOutlined style={{ fontSize: 20 }} />
                    )}
                </Flex>

                {profileSuccess && (
                    <>
                        <DropDown
                            selectedOption={activeProfile}
                            availableOptions={availableProfiles}
                            loading={changeProfileRequest}
                            onClick={onProfileClickHandler}
                        />
                        <button 
                            className={`button btn-green ml-auto no-select ${btnStyles}`}
                            onClick={e => { navigate('/profile-editor', { state: { prevProfile: activeProfile } }) }}
                        >Редактировать профиль</button>
                    </>
                )}
            </>
        )
    }

    return (
        <div className={styles.profile}>
            <div className={styles.header}>
                {headerContent()}
            </div>
            <div className={styles.tableWrapper}>
                <Table
                    rowKey={(record) => record.id}
                    loading={isDataUploading}
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
                        <button 
                            className={`button btn-blue mr-10 ${btnStyles} ${profileFailed && 'btn-inactive'}`}
                            onClick={onStartAllBtnClickHandler}
                            disabled={isDataUploading || profileFailed}
                        >Запустить всё</button>
                        <button 
                            className={`button btn-blue ${btnStyles} ${profileFailed && 'btn-inactive'}`}
                            onClick={onStopAllBtnClickHandler}
                            disabled={isDataUploading || profileFailed}
                        >Остановить всё</button>
                    </div>
                    {/* <button className='button btn-purple'>Открыть log</button> */}
                </Flex>
            </footer>

        </div>
    );
}

export default Dd104;
