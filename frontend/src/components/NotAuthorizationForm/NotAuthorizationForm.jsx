import React from 'react';
import style from './NotAuthorizationForm.module.css';
import { useForm, Controller } from "react-hook-form";
import { Input } from 'antd';


export const NotAuthorizationForm = ({control}) => {
    const {
        register,        
        formState:{
          errors,     
        },        
      } = useForm()
  return (
    <>
    <div className={style.textNotAuto}>Без авторизации
         <Controller                   
             id="utoken_type"            
             {...register('servers.utoken_type')}
             control={control}
             render={({field})=><div  {...field}            
             />}             
             /> 
    </div>

      {/* <div className={style.textNotAuto}>Без авторизации</div> */}
    
     
    </>

  
  )
}
export default NotAuthorizationForm;