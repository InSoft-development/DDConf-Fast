import React from 'react';
import style from './certForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import {Input} from 'antd';

export const CertForm = ({control}) => {
    const {
        register,        
        formState:{
          errors,     
        },        
      } = useForm()
  return (
    <div className={style.textSert}>Сертификат
    <div>
        <Controller
        id="cert"
        {...register('servers.utoken_data.cert')}
        control={control}
        render={({field})=><Input className={style.input1} {...field}/>}
        />
        {/* <Input className={style.input1}/> */}
    </div>
    <div>
    <Controller
        id="pkey"
        {...register('servers.utoken_data.pkey')}
        control={control}
        render={({field})=><Input className={style.input2} {...field}/>}
        />

        {/* <Input className={style.input2}/> */}
    </div>

</div>
  )
}
export default CertForm;