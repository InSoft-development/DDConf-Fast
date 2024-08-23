import React, { useCallback, useState } from 'react';
import style from './serverFormurl.module.css';
import UrlFormurl from '../urlFormurl/urlFormurl';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from 'antd';
import {ConfigProvider} from 'antd';
import { Button, Input } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons';
import {MinusOutlined} from '@ant-design/icons';

export const ServerFormul = () => {
  const{
    control,
    register,
    handleSubmit,
    formState:{
      errors,
    },
    reset,
  }=useForm();

  // const onSubmit = (data) =>{
  //   console.log(JSON.stringify(data));
  //   reset();
  // }
  const onSubmit = data => console.log(data);
  // ------------- Функция добавления СЕРВЕРА ------------------------

  const [server, setServer] =useState([1]);
  const addServer = useCallback(() =>{
    setServer(server => [...server, server.length+1])
  })
  // -----------------------------------------------------------------
  // -------------Функция удаления СЕРВЕРА----------------------------
  const handleDelete = (i)=>{
    const deleteServer = [...server]
    deleteServer.splice(i,1)
    setServer(deleteServer)
  }
  // -----------------------------------------------------------------

  // -------------------Функция вызова URL ---------------------------
  const [show, setShow] = useState(true);

  const [URLL, setUrls] = useState([]);
  const addURL = useCallback(()=>{
  setUrls(URLL => [...URLL, URLL.length]) 
  });
  const UrlDelete = (u) =>{
  const deleteUrl = [...URLL]
  deleteUrl.splice(u,1)
  setUrls(deleteUrl)
  }
  const Udelete = (w) =>{
  const deleteU = [...name]
  deleteU.splice(w,1)
  setName(deleteU)
  }
  const [name, setName] = useState('');
    
    const handleClick  = () =>{
      setName(<>
       <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.URL1}>URL 2
            <label >        
              <Controller          
              {...register('url2',{required: "Url 2 не заполнен"})}
              control={control}
              render={({field})=><Input placeholder='Введите URL-2' className={style.input1} {...field}/>}
              
              />      
            </label>
            <Button onClick={()=>{{Udelete();setShow(show)}}}  shape="circle" className={style.deleturl} type="Success" Success icon={<MinusOutlined />}></Button>
            </div>
            <div  style={{height:40}}>{errors?.url2 && <p className={style.mes}>{errors?.url2?.message || "Error!"}</p>}</div>   
    
            
           
          </form>
      
      
      
      
      </>)
    }
  // -----------------------------------------------------------------

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

      {/* ----------------- Сервер -------------------- */}
      {server.map((servers,i) => {
        return(
          <div>
            <div className={style.Address}>Сервер {servers}
                <div className={style.AddressButton}>
                <Button onClick={() => handleDelete(i)}  className={style.buttonDel} type="Success" Success icon={<DeleteOutlined />}>Удалить сервер</Button> 
                </div>
      {/* --------------- URL ---------------------------------*/}
      <div className={style.URL1}>URL 1
            <label >
            
              {/* <input
              {...register('url1',{required: "Url 1 не заполнен"})}/> */}
              <Controller 
              // name='url1'
              {...register('url1',{required: "Url 1 не заполнен"})}
              control={control}
              render={({field})=><Input placeholder='Введите URL-1' className={style.input1} {...field}/>}
              
              />      
            </label>
            {show && <Button onClick={()=>{{handleClick(); setShow(!show)}}} shape="circle"   className={style.addUrl} type="Success" Success icon={<PlusOutlined />}></Button>}
            </div>
            <div  style={{height:40}}>{errors?.url1 && <p className={style.mes}>{errors?.url1?.message || "Error!"}</p>}</div>
            <p>{name}</p>

      {/* ---------------------------------------------------- */}

            </div>
           
           
           
           
           
           
           
       
           

          </div>
        )
      })}
           <div className={style.AddressButton}>
            <Button onClick={() => {addServer()}} className={style.buttonAdd} type="Success" Success icon={<PlusOutlined />}>Добавить сервер</Button>
            </div>



 



 

   
    </form>
    </div>
    
    </>
  )
}
export default ServerFormul;