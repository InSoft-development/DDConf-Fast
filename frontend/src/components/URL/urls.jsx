import React from 'react';
import style from './urls.module.css';
import { useState, useCallback } from 'react';
import {Form, Input, Button} from 'antd';
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
  return (
    <>
    <Form onFinish={onFinish} style={{width: 500}}>  
    <Form.Item name={"URL 1"} label="URL 1" rules={[
                        {
                        
                            required:true,
                            message: 'URL 1 не заполнен',  
                        }
                    ]} >
                                {/* <div className={style.URL1}>URL 1 */}                        
                                        <Input className={style.input1} placeholder='Введите URL 1'/>     
                                        
                                {/* </div> */}
                    </Form.Item>
                    <Button shape="circle" onClick={() => addURL()}  className={style.addUrl} type="Success" Success icon={<PlusOutlined />}></Button>

                    {URLL.map((Url, u) =>{
                    return(
                        <>
                         <Form.Item rules={[
                {
                    required:true,
                    message: "URL 2 не заполнен", 
                }
            ]} name={"URL 2"} label="URL 2">
           
                <Input className={style.input2} placeholder='Введите URL 2'/>          
            
            </Form.Item> 
            <Button shape="circle" onClick={() => UrlDelete()}  className={style.deleturl} type="Success" Success icon={<MinusOutlined />}></Button>
            </>

                    )
                })} 
    </Form>

    </>
    
   
    
  )
}

export default Urls;
