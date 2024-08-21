import React from 'react';
import style from './serverFormurl.module.css';
import UrlFormurl from '../urlFormurl/urlFormurl';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from 'antd';
import {ConfigProvider} from 'antd';

export const ServerFormul = () => {
  const{
    control,
    handleSubmit,
  }=useForm();

  const onSubmit = (data) =>{
    alert(JSON.stringify(data));
  }
  return (
    <>
    
    <div className={style.wrapper}>
    {/* ------------------ CheckBox --------------- */}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.Restore}> Восстановить соединение после падения
      <Controller
        control={control}
        name="restore"
        render={({ field: { value, onChange } }) => (
          <ConfigProvider theme={{
            token:{
              colorPrimary: 'rgb(40,167,69)'
            }
          }}>
                <Checkbox className={style.checkbox}
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
              />
          </ConfigProvider>


       
        )}
      />

      </div>
      <input type="submit"/>
    </form>



    {/* ------------------------------------------- */}

    <UrlFormurl/>
    </div>
    
    </>
  )
}
export default ServerFormul;