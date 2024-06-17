import React,{useState} from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from "antd";
import styles from './app-header.module.css';


const AppHeader = () => {
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
                    
                    <p className={styles.first_text}>МЭК 104</p>                    
                    <p className={styles.first_text}>OPC UA</p>
                    <p className={styles.settings}>Настройки</p>

                </Drawer>
                    <h2 className={`text text_type_large ${styles.headerText}`}>Протокол МЭК 104</h2>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
