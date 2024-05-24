import React from "react";
import { MenuOutlined } from '@ant-design/icons';
import styles from './app-dashboard.module.css';
import { Drawer } from "antd";
import { useState } from "react";


const AppDashboard = () => {
    const [visible, setVisible] = useState(false);
    return (
    <header className={styles.header}>
        <div className={styles.upLine}>
            <div className={`wrapper ${styles.upLineContent}`}>
                ДД Конфигуртор
            </div>
        </div>
        <div className={styles.wrapper}>
            <div className={`wrapper ${styles.inner}`}>
                <MenuOutlined className={styles.menu} onClick={() =>{
                    setVisible(true);
                }}/>
                <Drawer
                    visible={visible}
                    title="ДД Конфигуратор"
                    onClose={() => {
                        setVisible(false);
                        
                    }}
                    placement="left">
                    
                    <p>МЭК 104</p>
                    
                    <p>OPC UA</p>

                </Drawer>
                


                <h2 className={`text text_type_large ${styles.headerText}`}>Дашбоард</h2>
                
            </div>
        </div>        
    </header>
    );
}

export default AppDashboard;