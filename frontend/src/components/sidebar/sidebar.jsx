import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    HomeOutlined,
    ApartmentOutlined,
    ApiOutlined
} from '@ant-design/icons';
import { CLOSE_SIDEBAR } from '../../services/actions/modals';

import styles from './sidebar.module.scss';

const Sidebar = () => {

    const dispatch = useDispatch();
    const { sidebarIsOpen } = useSelector(state => state.modals);
    const { protocols } = useSelector(state => state.dashboard);

    const onCloseHandler = () => {
        dispatch({ type: CLOSE_SIDEBAR });
    }

    return (
        <Drawer open={sidebarIsOpen}
            placement='left'
            onClose={onCloseHandler}
            keyboard={true}
        >
            <h2 className='text_type_main_large text_bold ml-10 mt-10'>ДД Конфигуратор</h2>
            <ul className={styles.navigationList}>
                <NavLink to='/' onClick={onCloseHandler} className='text_type_main_default' end>
                    <li>
                        <HomeOutlined style={{ marginRight: 10 }} />
                        Дашборд
                    </li>
                </NavLink>
                {protocols?.map(({ name, link, title }) => (
                    <NavLink key={name} to={link} className='text_type_main_default' onClick={onCloseHandler} end>
                        <li>
                            <ApartmentOutlined style={{ marginRight: 10 }} />
                            {title}
                        </li>
                    </NavLink>
                ))}
                <NavLink to='/network' className='text_type_main_default mt-10' onClick={onCloseHandler} end >
                    <li>
                        <ApiOutlined style={{ marginRight: 10 }} />
                        Сетевые интерфейсы
                    </li>
                </NavLink>
            </ul>
        </Drawer>
    );
}

export default Sidebar;
