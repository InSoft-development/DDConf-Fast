import React from 'react';
import style from './securitySettings.module.css';
import { useForm, Controller } from 'react-hook-form';
import { Option } from 'antd/es/mentions';
import { Select } from 'antd';
export const SecuritySettings = ({control}) => {
  const {
    register,        
    formState:{
      errors,     
    },        
  } = useForm()
  return (
    <div className={style.secutity}>Политка безопрасности
    <Controller
    id = "secpolicy"
    {...register('servers.secpolicy')}
    control={control}
    render={({ field }) => (
      <Select   className={style.select} {...field}>
        <Option value="None-None">None-None</Option>
        <Option value="Basic256Sha256 - Sign">Basic256Sha256 - Sign (uatcp-yasc-uabinary)</Option>
        <Option value="Basic256Sha256 - Sign & Encrypt">Basic256Sha256 - Sign & Encrypt (uatcp-uasc-uabinary)</Option>
        <Option value="Aes128_Sha256_RasOaep - Sign">Aes128_Sha256_RasOaep - Sign (uatcp-uasc-uabinary)</Option>
        <Option value="Aes128_Sha256_RasOaep - Sign & Encrypt">Aes128_Sha256_RasOaep - Sign & Encrypt (uatcp-uasc-uabinary)</Option>
        <Option value="Aes256_Sha256_RsaPss - Sign">Aes256_Sha256_RsaPss - Sign (uatcp-uasc-uabinary)</Option>
        <Option value="Aes256_Sha256_RsaPss - Sign & Encrypt">Aes256_Sha256_RsaPss - Sign & Encrypt (uatcp-uasc-uabinary)</Option>
      </Select>
    )}
    
    />



    
    
    
    
    </div>
  )
}
export default  SecuritySettings;