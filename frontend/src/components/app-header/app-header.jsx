import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import styles from './app-header.module.css';
import { OPEN_SIDEBAR } from '../../services/actions/modals';

const AppHeader = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [headerTitle, setHeaderTitle] = useState('');

    const onMenuClickHandler = () => {
        dispatch({type: OPEN_SIDEBAR});
    }

    useEffect(() => {
        const headerText = {
            '/': 'Дашборд',
            '/dd104': 'Протокол МЭК 104',
            '/profile-editor': 'Протокол МЭК 104',
            '/opcua': 'OPC UA',
            '/network': 'Сетевые интерфейсы'
        }

        setHeaderTitle(headerText[location.pathname])
    }, [location])
   

    return (
        <header className={styles.header}>
            <div className={styles.upLine}>
                <div className={`wrapper ${styles.upLineContent}`}>
                    ДД Конфигуратор
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={`wrapper ${styles.inner}`}>
                    <MenuOutlined className={styles.menu} onClick={onMenuClickHandler}/>
                    <h2 className={`text text_type_large ${styles.headerText}`}>{headerTitle}</h2>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
