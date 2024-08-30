import React from 'react';
import style from './urlFormurl.module.css';
import { Input, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useState } from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {MinusOutlined} from '@ant-design/icons';
import { Controller } from 'react-hook-form';



export const UrlFormurl = ({control}) => {
    const {
        register,
       
        
        formState:{
          errors,     
        },
        handleSubmit,
       
        reset,
      } = useForm();
    
      const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset();    
      }

    
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
         
              <Controller 
              id = "url2"        
              {...register('servers.url2',{ required: "Url 2 не заполнен"})}
              control={control}
              render={({field})=><Input  placeholder='Введите URL-2' className={style.input1} {...field}
              
             
              />}
              
              />      
         
            <Button onClick={()=>{{Udelete();setShow(show)}}}  shape="circle" className={style.deleturl} type="Success" Success icon={<MinusOutlined />}></Button>
            </div>
            <div  style={{height:40}}>{errors?.url2 && <p className={style.mes}>{errors?.url2?.message}</p>}</div>   
    
            
           
          </form>



          
      
      
      
      
      </>)
    }
    
    
    
    
    
    
      return (
        <>
        <div className={style.wrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.URL1}>URL 1
            <label >
            
              
              <Controller 
             
            
              id="url1"
             
              {...register('servers.url1',{required: "Url 1 не заполнен"})}
              control={control}
              render={({field})=><Input placeholder='Введите URL-1' className={style.input1} {...field}
             
              />}
              
              />      
            </label>
            {show && <Button onClick={()=>{{handleClick(); setShow(!show)}}} shape="circle"   className={style.addUrl} type="Success" Success icon={<PlusOutlined />}></Button>}
            </div>
            <div  style={{height:40}}>{errors?.url1 && <p className={style.mes}>{errors?.url1?.message || "Error!"}</p>}</div>
            <p>{name}</p>  
            
          </form>
          
          
    
    
        
         </div> 
        
         
        </>
       
      )

}
export default UrlFormurl;