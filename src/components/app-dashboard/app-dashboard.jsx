import React from "react";
import { MenuOutlined } from '@ant-design/icons';
import styles from './app-dashboard.module.css';
import { Drawer } from "antd";
import { useState } from "react";
import AppDashboardFiles from "../app-dashboardFiles/app-dashboardFiles";
import {Link } from "react-router-dom";






const AppDashboard = () => {


    const onClose = () => {
        setVisible(false);
    }
    

   const [name, setName] = useState('Дашбоард');
   
   const handleClick = () =>{
    setName('Протокол МЭК 104');   
   };
   const handleClickD = () =>{
    setName('Дашбоард');

   }
   
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
                    <Link onClick={() =>{onClose(); handleClickD()}}  className={styles.first_text} to='/'>Дашбоард</Link>  
                    <Link onClick={() =>{onClose(); handleClick()}} className={styles.first_text} to='/app-mek104' >МЭК 104</Link>         
                                     
                    <p className={styles.first_text}>OPC UA</p>
                    <p className={styles.settings}>Настройки</p>

                </Drawer>
                
                


                <h2 className={`text text_type_large ${styles.headerText}`}>{name}</h2>
                
            </div>

         
        </div>  
            {/* <AppDashboardFiles/>  */}
        
          
    </header>
    
    );
}

export default AppDashboard;