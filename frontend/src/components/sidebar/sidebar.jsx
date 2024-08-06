import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_SIDEBAR } from '../../services/actions/modals';
import {NavLink} from 'react-router-dom';
import { CloseOutlined, HomeOutlined, ProfileOutlined} from '@ant-design/icons';
import styles from './sidebar.module.css';

const Sidebar = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape'){
                closeSidebar();
            }
        });

        return () => {
            document.removeEventListener('keydown', (e) => {
                if(e.key === 'Escape'){
                    closeSidebar();
                }
            })
        }

    }, [])


    const closeSidebar = () => {
        dispatch({type: CLOSE_SIDEBAR});
    }

    const navLink = ({isActive}) => isActive ? styles.linkActive : styles.link;

    return (
        <div className={`text ${styles.sidebar}`}>
            <aside className={styles.aside}>
                <div className={styles.clsBtn} onClick={e => closeSidebar()}><CloseOutlined/></div>
                <div>
                    <h2 className='text text_type_main mt-10 ml-20'>ДД Конфигуртор</h2>
                    <nav className='mt-40'>
                        <ul className={styles.navigationLink}>
                            <NavLink to='/' className={navLink} onClick={e => closeSidebar()}>
                                <HomeOutlined style={{marginRight: 10}}/>
                                Дашборд
                            </NavLink>
                            <NavLink to='/dd104' className={navLink} onClick={e => closeSidebar()}>
                                <ProfileOutlined style={{marginRight: 10}}/>
                                МЭК 104
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;

