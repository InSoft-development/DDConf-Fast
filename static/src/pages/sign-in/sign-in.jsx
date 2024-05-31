import React from 'react';
import { Input } from 'antd';

import styles from './sign-in.module.css';

const SignIn = () => {
    return (
        <div className={`text text_sing_in ${styles.singInWrapper}`}>
            <h2 className='text_type_large mb-10'>Вход</h2>
            <form className={styles.form}>
                <div>
                    <div className='mb-6'>Имя пользователя</div>
                    <Input placeholder='имя' className={styles.input}/>
                </div>
                <div className='mt-10 mb-10'>
                    <div className='mb-6'>Пароль</div>
                    <Input.Password placeholder='пароль' className={styles.input}/>
                </div>
                <button className={`button btn-blue ${styles.button}`}>Войти</button>
            </form>
        </div>
    );
}

export default SignIn;
