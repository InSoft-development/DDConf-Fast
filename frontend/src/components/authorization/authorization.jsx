import React from 'react';
import { Input } from 'antd';
import style from './authorization.module.css';

export const Authorization = () => {
  return (
    <div className={style.textAuto}>Авторизация
    <div>
        <Input className={style.input1} placeholder='Введите Логин'/>
    </div>

    <div>
        <Input className={style.input2} placeholder='Введите пароль'/>
    </div>
    
    </div>
  )
}
export default Authorization;