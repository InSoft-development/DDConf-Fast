import React, {useState} from "react";
import styles from './app-dashboardFiles.module.css';
import AppDashboardTable from "../app-dashboardTable/app-dashboardTable";
import data from '../../utils/fetch_initial.json';
import dataProt from '../../utils/fetch_protocols.json';



const AppDashboardFiles = () =>{
    const [contacts] = useState(data);
    const [contactsProt] = useState(dataProt);
    return (
      <div className={styles.wrapper}>
        <div className={styles.LineContent}>ПАК ОПТИ: 
            {contacts.map((contact) =>
                <span className={styles.LineContentF}>{contact.serial}</span>
            )}
            
        </div>

        <div className={styles.LineContentLic}>Лицензия:
            {contacts.map((contact) =>
                <span className={styles.LineContentNL}>{contact.license}</span>
            )}
           
        </div>

        <div className={styles.LineContentProt}>Протоколы:</div>
        {contactsProt.map((contact) =>
        <div className={styles.LineContentMEK}>{contact.name}</div>
        
        )} 
        {/* {contactsProt.map((contact) =>
        <div className={styles.LineContentOPC}>{contact.name}</div>  
        )} */}
          
            
        

        <div className={styles.LineContentSetIn}>Сетевые интерфейсы:</div>       
        <AppDashboardTable/>

       
      </div>    
      
     )

}
export default AppDashboardFiles;