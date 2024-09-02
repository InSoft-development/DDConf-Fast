import React from 'react';
import style from './msmform.module.css';
import { useForm, Controller } from 'react-hook-form';
import { Option } from 'antd/es/mentions';
import { Select } from 'antd';


export const Msmform = ({control}) => {
    const {
        register,        
        formState:{
          errors,     
        },        
      } = useForm()
  return (
    <div className={style.secutity}>Режим безопасности сообщений
    <Controller
    id = 'mesmode'
    {...register('servers.mesmode')}
    control={control}
    render={({ field }) => (
        <Select   className={style.select} {...field}>
          <Option value="none">none</Option>
          <Option value="Sign">Sign</Option>
          <Option value="Sign & Encrypt">Sign & Encrypt (значение тега “SignAndEncrypt”)</Option>
          
        </Select>
      )}

    
    />



    </div>
  )
}
export default Msmform;