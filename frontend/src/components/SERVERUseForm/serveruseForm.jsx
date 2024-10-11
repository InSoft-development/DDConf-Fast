import React, { useCallback } from 'react';
import { useState } from 'react';
import TypeAvtForm from '../typeAvtForm/typeAvtForm';
import style from './serveruseForm.module.css';
import UrlFormurl from '../urlFormurl/urlFormurl';
import Msmform from '../MSM/msmform';
import SubscriptionForm from '../subscriptionForm/subscriptionForm';
import SecuritySettings from '../securitySettinns/securitySettings';

import TestForm from '../testForm/testForm';

import { useForm, Controller } from "react-hook-form";
import RestoreFormurl from '../restore-formurl/restoreFormurl';
import {DeleteOutlined} from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons';
import { Button,Select } from 'antd';
import { Input} from 'antd';





// -----------------Структура -----------------------
const defaultValues ={
    restore: false,  
    servers:
       {
        url1:"",
        url2:"",
        utoken_type: 'Anonymous', 
        utoken_data: {
        username: null,
        password: null,
      } | {
        cert: null,
        pkey: null,
      } | null,
      secpolicy: "None-None",
      mesmode: "none",
      subscriptions: 
        {
          interval: '',
          items: '',
        },

      }
}

// ---------------------------------------------------















export const ServeruseForm = () => {



    const { handleSubmit, register, reset, setValue, control,
      formState:{
        errors,
      },
     } = useForm({ defaultValues});
    const [data, setData] = useState(null);
    // const onSubmit = (data) => {
    //   console.log(data);
    //   reset();
    // }
  
    
   
    const onSubmit = (data) =>{
    console.log(JSON.stringify(data));
    reset();
   
  }
 
 // ------------- Функция добавления СЕРВЕРА ------------------------
 const [server, setServer] = useState([1]);
 const addServer = useCallback(()=>{
  setServer(server=>[...server, server.length+1])
 })
//  -----------------------------------------------------------------
  // -------------Функция удаления СЕРВЕРА---------------------------
  const handleDelete = (i) => {
    const deleteServer = [...server]
    deleteServer.splice(i,1)
    setServer(deleteServer)
  }
  // ----------------------------------------------------------------


  return (
    <>
    {/* <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}> */}
    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
      
        <RestoreFormurl control={control} />
        
        {/* ------------------ Сервер ----------------------------  */}
        {server.map((servers,i)=>{
          return(
            <div className={style.Address}>Сервер {servers}
              <div className={style.AddressButton}>
                <Button onClick={()=> handleDelete(i)} className={style.buttonDel} type="Success" Success icon={<DeleteOutlined />}>Удалить Сервер</Button>
              </div>
              {/* ---------------------- URL ----------------------------- */}

              <form onSubmit={handleSubmit(onSubmit)}>
                <UrlFormurl control={control}    />
                {/* {...register('servers.url1',{required: true})} */}
              </form>
              {/* -------------------------------------------------------- */}
              {/* --------------- Выбор авторизации ---------------------- */}
                <TypeAvtForm control={control}/>
              {/* -------------------------------------------------------- */}


              {/* ------------------- Политика безопасности -------------- */}
              <SecuritySettings control={control}/>
              {/* -------------------------------------------------------- */}

              {/* --------------- Режим безопасности сообщений ----------- */}
              <Msmform control={control}/>
              {/* -------------------------------------------------------- */}

              {/* -------------------- Подписка -------------------------- */}
              <SubscriptionForm control={control}/>
              {/* -------------------------------------------------------- */}

              {/* -------------------- TestForm -------------------------- */}
              {/* <TestForm/> */}
              {/* -------------------------------------------------------- */}

            </div>
          )
        })}
        <div className={style.AddressButton}>
          <Button onClick={() => {addServer()}} className={style.buttonAdd} type="Success" Success icon={<PlusOutlined />}>Добавить сервер</Button>
        </div>
        {/* ------------------------------------------------------- */}

       
      
        <input type="submit" {...{ data, setValue }} /> 
        {/* <input type="submit"  />  */}
    </form>
     
    </>
   
  )
}
export default ServeruseForm;