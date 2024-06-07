import React from "react";
import { MenuOutlined } from '@ant-design/icons';
import styles from './app-dashboard.module.css';
import { Drawer } from "antd";
import { useState } from "react";
import AppDashboardFiles from "../app-dashboardFiles/app-dashboardFiles";
import { Route, Routes } from "react-router-dom";
import AppMek from "../app-mek/app-mek104";


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
                    
                    <a className={styles.first_text} href='/app-mek104'>МЭК 104</a>                    
                    <p className={styles.first_text}>OPC UA</p>
                    <p className={styles.settings}>Настройки</p>

                </Drawer>
                <Routes>
                    <Route path="/app-mek104" element={<AppMek/>}/>

                </Routes>
                


                <h2 className={`text text_type_large ${styles.headerText}`}>Дашбоард</h2>
                
            </div>

         
        </div>  
            {/* <AppDashboardFiles/>  */}
          
    </header>
    
    );
}

export default AppDashboard;