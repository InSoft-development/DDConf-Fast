import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './dd104.module.css';
import { columns } from '../../utils/table-description';
import DropDown from '../../components/drop-down/drop-down';
import { getProfiles } from '../../services/actions/profile';
import { changeProсess } from '../../services/actions/profile';


const Dd104 = () => {

    const dispatch = useDispatch();
    const { profileRequest,
        activeProfile,
        availableProfiles,
        processes,
        processRequest
    } = useSelector(state => state.profile);


    useEffect(() => {
        dispatch(getProfiles());
    }, [])

    const onStartAllBtnClickHandler = (e) => {
        dispatch(changeProсess('start', processes.map((processes, index) => index)))
    }

    const onStopAllBtnClickHandler = (e) => {
        dispatch(changeProсess('stop', processes.map((processes, index) => index)))
    }

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
            {processes.length !== 0 && (
                <Flex justify='space-between'>
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
            )}
        </div>
    );
}

export default Dd104;