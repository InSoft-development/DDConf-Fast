import React, {useState} from "react";
import styles from './app-dashboardTable.module.css';
import data from '../../utils/mock-data.json';
import { useEffect } from "react";


const AppDashboardTable = () => {
    const [contacts] = useState(data);
    const [posts, setPosts] = useState([]);
    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => setPosts(data))

    }, []);
    return(
        <div>
            <table>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={`str-${index}`}>
                            <td className={styles.numberStr}>{index + 1}</td>
                            <td className={styles.numberStr}></td>
                            <td className={styles.numberIP}>{post.name}</td>
                            <td className={styles.numberMAC}>{post.body}</td>
                            <td
                            style={{color: post.email === 'Down' ? 'rgb(108, 117, 125)' : 'rgb(25, 135, 84)' }}
                            >{post.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AppDashboardTable;