import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import style from './authorizForm.module.css';
import { Input } from 'antd';



export const AuthorizForm = ({control}) => {
    const {
        register,        
        formState:{
          errors,     
        },        
      } = useForm()
  return (
    <>
    <div className={style.textAutoLogin}>Логин
        <Controller                           
            id="username"            
            {...register('servers.utoken_data.username')}
            control={control}
            render={({field})=><Input name='Логин' className={style.input1} placeholder='Введите логин' {...field}/>}                  
        />
    </div>

    <div className={style.textAutoPass}>Пароль
        <Controller                           
            id="password"            
            {...register('servers.utoken_data.password')}
            control={control}
            render={({field})=><Input.Password name='Логин' className={style.input2} placeholder='Введите логин' {...field}/>}                  
        />
    </div>

    </>
  )
}
export default AuthorizForm;