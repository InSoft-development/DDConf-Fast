import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.upLine}>
                <div className={`wrapper ${styles.upLineContent}`}>
                    ДД Конфигуртор
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={`wrapper ${styles.inner}`}>
                    <MenuOutlined className={styles.menu}/>
                    <h2 className={`text text_type_large ${styles.headerText}`}>Протокол МЭК 104</h2>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
