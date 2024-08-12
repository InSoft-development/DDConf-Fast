import React from 'react';
import style from './urls.module.css';
import { useCallback } from 'react';
import { useState } from 'react';
import { Button, Input } from 'antd';
import {Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {MinusOutlined} from '@ant-design/icons';






export const Urls = () => {

    
    const onFinish=(values)=>{
        console.log({values});
    }
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

const handleClick = () =>{
    setName(<>
   

     <Form.Item rules={[
        {
            required:true,
            message: "URL 2 не заполнен", 
        }
    ]} name={"URL 2"} label="URL 2">
   
        <Input className={style.input2} placeholder='Введите URL 2'/>          
       
    </Form.Item> 
    <Button shape="circle" onClick={() => Udelete()}  className={style.deleturl} type="Success" Success icon={<MinusOutlined />}></Button>
    </>);
}

  return (
    <>
    <Form onFinish={onFinish}>
        <Form.Item name={"URL 1"} label="URL 1" rules={[
            {                     
              required:true,
              message: 'URL 1 не заполнен',  
            }
            ]}>
                                   
               <Input className={style.input1} placeholder='Введите URL 1'/>     
                                        
                             
            </Form.Item>
            <Button shape="circle" onClick={()=>{handleClick()}}  className={style.addUrl} type="Success" Success icon={<PlusOutlined />}></Button> 
         

                <p>{name}</p>
               
                                      

    </Form>
     
    </>
   
  )
}
export default Urls;
