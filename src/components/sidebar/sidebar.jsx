import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_SIDEBAR } from '../../services/actions/modals';
import {NavLink} from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import styles from './sidebar.module.css';

const Sidebar = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        document.addEventListener('keydown', onEscapeClickHandler);

        return () => {
            document.removeEventListener('keydown', onEscapeClickHandler)
        }

    }, [])

    const onEscapeClickHandler = (e) => {
        if(e.key === 'Escape'){
            dispatch({type: CLOSE_SIDEBAR});
        }
    }

    const onCloseBtnClickHandler = () => {
        dispatch({type: CLOSE_SIDEBAR});
    }

    return (
        <div className={`text ${styles.sidebar}`}>
            <aside className={styles.aside}>
                <div className={styles.clsBtn} onClick={onCloseBtnClickHandler}><CloseOutlined/></div>
                <div>
                    <h2 className='text text_type_main mt-10'>ДД Конфигуртор</h2>
                    <nav className='mt-30'>
                        <ul>
                            <NavLink to='/dd104'>МЭК 104</NavLink>
                            <li>OPC UA</li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;

