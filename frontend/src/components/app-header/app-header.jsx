import React from 'react';
import { useDispatch } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import { OPEN_SIDEBAR } from '../../services/actions/modals';
import styles from './app-header.module.scss';

const AppHeader = ({ title }) => {

    const dispatch = useDispatch();

    const onMenuClickHandler = () => {
        dispatch({ type: OPEN_SIDEBAR });
    }

    return (
        <header className={styles.header}>
            <div className={styles.upLine}>
                <h6 className='wrapper text_type_main_small text_bold'>ДД Конфигуратор</h6>
            </div>
            <div className={styles.middleLine}>
                <h4 className='wrapper text_type_main_extra-large'>
                    <MenuOutlined className='mr-14'
                        onClick={e => onMenuClickHandler()}
                        style={{ fontSize: 34 }}
                    />
                    {title}
                </h4>
            </div>
        </header>
    );
}

export default AppHeader;
