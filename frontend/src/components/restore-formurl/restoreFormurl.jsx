import React from 'react';
import style from './restoreFormul.module.css';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from 'antd';
import {ConfigProvider} from 'antd';


export const RestoreFormurl = ({control}) => {   
  return (
    <div className={style.Restore}> Восстановить соединение после падения
    <Controller
      control={control}
      name="resett"
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
  )
}
export default RestoreFormurl;