import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Flex } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    HomeOutlined,
    ProfileOutlined,
    ApiOutlined
} from '@ant-design/icons';
import { CLOSE_SIDEBAR } from '../../services/actions/modals';

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
            <h2 className='text text_type_main'>ДД Конфигуратор</h2>
            <Flex vertical='true' className='mt-40'>
                <NavLink
                    to='/'
                    onClick={onCloseHandler}
                    className='text'
                    end
                >
                    <HomeOutlined style={{ marginRight: 10 }} />
                    Дашборд
                </NavLink>
                <NavLink
                    to='/dd104'
                    className='text mt-20'
                    onClick={onCloseHandler}
                    end
                >
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    МЭК 104
                </NavLink>
                <NavLink
                    to='/opcua'
                    className='text mt-10'
                    onClick={onCloseHandler}
                    end
                >
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    OPC UA
                </NavLink>
                <NavLink
                    to='/network'
                    className='text mt-10'
                    onClick={onCloseHandler}
                    end
                >
                    <ApiOutlined style={{ marginRight: 10 }} />
                    Сетевые интерфейсы
                </NavLink>
            </Flex>
        </Drawer>
    );
}

export default Sidebar;
