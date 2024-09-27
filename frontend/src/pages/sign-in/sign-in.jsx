import React from 'react';
import styles from './sign-in.module.css';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';

const Login = () => {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data);        
    }

    return (
        <div className={`text text_sing_in ${styles.loginWrapper}`}>
            <h2 className='text_type_large mb-10'>Вход</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Flex vertical={true} >
                    <label htmlFor='login' className='mb-6'>Имя пользователя</label>
                    <input
                        id='login'
                        name='login'
                        placeholder='Введите имя'
                        type='text'
                        {...register('login', {
                            required: true
                        })}
                        className={styles.input}
                        autoComplete='off'
                        />
                </Flex>
                <Flex  vertical={true} className='mt-10 mb-20'>
                    <label htmlFor='password' className='mb-6'>Пароль</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Введите пароль'
                        {...register('passworld', {
                            required: true
                        })}
                        className={styles.input}
                        autoComplete='off'
                    />
                </Flex>
                <button className={`button btn-green`} type='submit'>Войти</button>
            </form>
        </div>
    );
}

export default Login;
