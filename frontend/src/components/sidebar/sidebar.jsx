import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    HomeOutlined,
    ProfileOutlined,
    ApiOutlined
} from '@ant-design/icons';
import { CLOSE_SIDEBAR } from '../../services/actions/modals';
import styles from './sidebar.module.css';

const Sidebar = () => {

    const dispatch = useDispatch();
    const { sidebarIsOpen } = useSelector(state => state.modals);

    const onCloseHandler = () => {
        dispatch({ type: CLOSE_SIDEBAR });
    }

    return (
        <Drawer open={sidebarIsOpen}
            placement='left'
            onClose={onCloseHandler}
            keyboard={true}
        >
            <h2 className='text_type_main_large'>ДД Конфигуратор</h2>
            <ul className={styles.navigationList}>
                <li>
                    <NavLink
                        to='/'
                        onClick={onCloseHandler}
                        className='text_type_main_default'
                        end
                    >
                        <HomeOutlined style={{ marginRight: 10 }} />
                        Дашборд
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dd104'
                        className='text_type_main_default'
                        onClick={onCloseHandler}
                        end
                    >
                        <ProfileOutlined style={{ marginRight: 10 }} />
                        МЭК 104
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/opcua'
                        className='text_type_main_default'
                        onClick={onCloseHandler}
                        end
                    >
                        <ProfileOutlined style={{ marginRight: 10 }} />
                        OPC UA
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/network'
                        className='text_type_main_default'
                        onClick={onCloseHandler}
                        end
                    >
                        <ApiOutlined style={{ marginRight: 10 }} />
                        Сетевые интерфейсы
                    </NavLink>
                </li>
            </ul>
        </Drawer>
    );
}

export default Sidebar;
