import React from "react";
import styles from './app-dashboardFiles.module.css';
import AppDashboardTable from "../app-dashboardTable/app-dashboardTable";



const AppDashboardFiles = () =>{
    return (
      <div className={styles.wrap}>
        <div className={styles.LineContent}>ПАК ОПТИ: 
            <span className={styles.LineContentF}>номер устройства</span>
        </div>

        <div className={styles.LineContentLic}>Лицензия: 
            <span className={styles.LineContentNL}>номер лицензии</span>
        </div>

        <div className={styles.LineContentProt}>Протоколы: 
            <div className={styles.LineContentMEK}>МЭК 104</div>
            <div className={styles.LineContentOPC}>OPC UA</div>
        </div>

        <div className={styles.LineContentSetIn}>Сетевые интерфейсы:</div>       
        <AppDashboardTable/>

       
      </div>    
      
     )

}
export default AppDashboardFiles;