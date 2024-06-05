import Reac, {useState} from "react";
import styles from './app-dashboardTable.module.css';
import data from '../../utils/mock-data.json';


const AppDashboardTable = () => {
    const [contacts] = useState(data);
    return(
        <>
        <div>
            <table>
                <tbody>
                    {contacts.map((contact) =><tr>
                        <td className={styles.numberStr}></td>
                        <td className={styles.numberIP}>{contact.IPaddress}</td>
                        <td className={styles.numberMAC}>{contact.MACaddress}</td>
                        <td
                        style={{color: contact.work === 'Down' ? 'rgb(108, 117, 125)' : 'rgb(25, 135, 84)' }}
                        >{contact.work}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        </>

    )
}
export default AppDashboardTable;