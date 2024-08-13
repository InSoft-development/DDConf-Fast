import React from 'react';
import { useState } from 'react';
import style from './typeavt.module.css';
import {Form} from 'antd';
import Authorization from '../authorization/authorization';
import Certificatee from '../certificatee/certificatee';
import Notauthorization from '../not_authorization/notauthorization';

export const Typeavt = () => {
    const [selected, setSelected] = useState('Без авторизации');
    const handleChange = (e) => {
        setSelected(e.target.value);
    }
    const onFinish=(values)=>{
        console.log({values});
    }
    


  return (
    <Form onFinish={onFinish} style={{width: 500}}>  
    <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt}>Тип авторизации
        <select className={style.select}>
            <option value="Без авторизации">Без авторизации</option>
            <option value="Авторизация">По имени пользователя</option>
            <option value="Сертификат">По сертификату</option>
        </select>                           
    </div>            
    <div className={style.AotoPol}>
        {selected == "Без авторизации"?<Notauthorization/>:""}
        {selected == "Авторизация"?<Authorization/>:""}
        {selected == "Сертификат"?<Certificatee/>:""}             
    </div>
</Form>
  )
}
export default Typeavt;
