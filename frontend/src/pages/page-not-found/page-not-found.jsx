import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './page-not-found.module.scss';

const PageNotFound = () => {

    return (
        <div className={styles.PageNotFound}>
            <h1 className='text_type_main_extra-large'>404</h1>
            <h2 className='text_type_main_large mb-20'>Страница не найдена</h2>
            <a href='/' className='text_type_main_default'>
                <ArrowLeftOutlined className='mr-8'/>
                Вернуться на страницу дашборд
            </a>
        </div>
    );
}

export default PageNotFound;
