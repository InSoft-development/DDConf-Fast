import React, { useState } from 'react';
import style from './typeAvtForm.module.css';
import { useForm, Controller } from "react-hook-form";
import NotAuthorizationForm from '../NotAuthorizationForm/NotAuthorizationForm';
import AuthorizForm from '../authorizForm/authorizForm';
import CertForm from '../certForm/certForm';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';

export const TypeAvtForm = ({control}) => {
    const {
        register,    
        
        formState:{
          errors,     
        },
        handleSubmit,
       
        reset,
      } = useForm()



    const [selected, setSelected] = useState('Anonymous');
    const handleChange = (e) => {
        setSelected(e.target.value);
    }
  return (
        <>
        <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt}>Тип авторизации
          <Controller
          id = "utoken_type"
          {...register('servers.utoken_type')}
          control={control}
          render={({field}) =>(
             <select className={style.select} {...field}>
                <option   value="Anonymous">Без авторизации</option>
                <option   value="username">По имени пользователя</option>
                <option   value="cert">По сертификату</option>
            </select>

          )}
          
          />

              {/* <select className={style.select}>
                <option   value="Без авторизации">Без авторизации</option>
                <option   value="username">По имени пользователя</option>
                <option   value="cert">По сертификату</option>
              </select> */}
          
           

        </div>            
        <div className={style.AotoPol}>
            {selected == "Anonymous"?<NotAuthorizationForm control={control}/>:""}
            {selected == "username"?<AuthorizForm control={control}/>:""}
            {selected == "cert"?<CertForm control={control}/>:""}             
        </div>
    </>

    
  )
}
export default TypeAvtForm;
