import React, { useState } from 'react';
import style from './typeAvtForm.module.css';
import { useForm, Controller } from "react-hook-form";
import NotAuthorizationForm from '../NotAuthorizationForm/NotAuthorizationForm';
import AuthorizForm from '../authorizForm/authorizForm';
import CertForm from '../certForm/certForm';

export const TypeAvtForm = ({control}) => {
    const {
        register,    
        
        formState:{
          errors,     
        },
        handleSubmit,
       
        reset,
      } = useForm()



    const [selected, setSelected] = useState('Без авторизации');
    const handleChange = (e) => {
        setSelected(e.target.value);
    }
  return (
        <>
        <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt}>Тип авторизации
            <select className={style.select}>
                <option  value="Без авторизации">Без авторизации</option>
                <option  value="Авторизация">По имени пользователя</option>
                <option  value="Сертификат">По сертификату</option>
            </select>                           
        </div>            
        <div className={style.AotoPol}>
            {selected == "Без авторизации"?<NotAuthorizationForm control={control}/>:""}
            {selected == "Авторизация"?<AuthorizForm control={control}/>:""}
            {selected == "Сертификат"?<CertForm control={control}/>:""}             
        </div>
    </>

    
  )
}
export default TypeAvtForm;
