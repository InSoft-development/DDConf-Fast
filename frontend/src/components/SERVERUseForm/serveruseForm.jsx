import React from 'react';
import { useState } from 'react';
import style from './serveruseForm.module.css';
import { useForm, Controller } from "react-hook-form";
import RestoreFormurl from '../restore-formurl/restoreFormurl';





const defaultValues ={
    resett: false,
}

export const ServeruseForm = () => {
    const { handleSubmit, register, reset, setValue, control } = useForm({ defaultValues });
    const [data, setData] = useState(null);
    // const onSubmit = data => console.log(data);
   
    const onSubmit = (data) =>{
    console.log(JSON.stringify(data));
    // reset();
  }


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
        <RestoreFormurl control={control} />

        <input type="submit" {...{ data, setValue }} />
      
        
    </form>
     
    </>
   
  )
}
export default ServeruseForm;
