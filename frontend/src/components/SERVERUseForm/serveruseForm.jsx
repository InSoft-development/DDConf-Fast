import React, { useCallback } from 'react';
import { useState } from 'react';
import style from './serveruseForm.module.css';
import UrlFormurl from '../urlFormurl/urlFormurl';
import { useForm, Controller } from "react-hook-form";
import RestoreFormurl from '../restore-formurl/restoreFormurl';
import {DeleteOutlined} from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons';
import { Button,Select } from 'antd';





// -----------------Структура -----------------------
const defaultValues ={
    resett: false,
    servers:[
      {
        url1:"",
        url2:""
      }
    ]
    
    
    // servers:
    //   {
    //     url1:" ",
    //     url2:" ",
    //   }
    
}
// ---------------------------------------------------

export const ServeruseForm = () => {
    const { handleSubmit, register, reset, setValue, control } = useForm({ defaultValues });
    const [data, setData] = useState(null);
    // const onSubmit = data => console.log(data);
   
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
              <UrlFormurl control={control} />
         

              {/* -------------------------------------------------------- */}

            </div>
          )
        })}
        <div className={style.AddressButton}>
          <Button onClick={() => {addServer()}} className={style.buttonAdd} type="Success" Success icon={<PlusOutlined />}>Добавить сервер</Button>
        </div>
        {/* ------------------------------------------------------- */}

       
      
        <input type="submit" {...{ data, setValue }} /> 
    </form>
     
    </>
   
  )
}
export default ServeruseForm;
