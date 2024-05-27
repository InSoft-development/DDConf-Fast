import React from "react";
import styles from './app-dashboardFiles.module.css';
import { Table } from "antd";
import { dataSource, columns } from '../../utils/mock';

const AppDashboardFiles = () =>{
    return (
      <div>
        <div className={styles.LineContent}>ПАК ОПТИ: 
            <span className={styles.LineContentF}>номер устройства</span>
        </div>

        <div className={styles.LineContentLic}>Лицензия: 
            <span className={styles.LineContentNL}>номер лицензии</span>
        </div>

        <div className={styles.LineContentProt}>Протоколы: 
            <div className={styles.LineContentPr}>МЭК 104</div>
            <div className={styles.LineContentPr}>OPC UA</div>
        </div>

        <div className={styles.LineContentSetIn}>Сетевые интерфейсы: 
     
            
        </div>

      
      </div>

        
        
        
        

    )

}
export default AppDashboardFiles;