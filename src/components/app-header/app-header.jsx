import React from 'react';
import { useDispatch } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import styles from './app-header.module.css';
import { OPEN_SIDEBAR } from '../../services/actions/modals';

const AppHeader = () => {

    const dispatch = useDispatch();

    const onMenuClickHandler = () => {
        dispatch({type: OPEN_SIDEBAR});
    }

    return (
        <header className={styles.header}>
            <div className={styles.upLine}>
                <div className={`wrapper ${styles.upLineContent}`}>
                    ДД Конфигуртор
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={`wrapper ${styles.inner}`}>
                    <MenuOutlined className={styles.menu} onClick={onMenuClickHandler}/>
                    <h2 className={`text text_type_large ${styles.headerText}`}>Протокол МЭК 104</h2>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
