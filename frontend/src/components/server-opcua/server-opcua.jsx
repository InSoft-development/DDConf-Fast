import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import style from './server-opcua.module.css'
import { Button } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons';
import Subscription from '../subscription/subscription';
import Typeavt from '../typeAvt/typeavt';
import Urls from '../URL/urls';









export const Serveropcua = () => {
      const [typename, setTypename] = useState(['']);
    const addTypename = () =>{
        setTypename([...typename,{
            'utoken_data':{
                'username':'',
                'password':''
            } 
        }])
    }
    const [type, setType] = useState([]);
    const addType = () =>{
        setType([...type,{
            'utoken_type':'string',
            
        }])
    }
    const [typeCert, setTypecert] = useState([]);
    const addTypecert = () => {
        setTypecert([...typeCert,{
            'utoken_cert':{
                'cert':'',
                'pkey':''
            }
        }])
    }
    const [intervl, setIntrvl] = useState([]);
    const addIntervl = () =>{
        setIntrvl([...intervl,{
            'interval':'',
        }])
    }
    const [items, setItems] = useState([]);
    const addItems =()=>{
        setItems(...items,{
            'items':'',
        })
    }
    
    const [servers, setServers] = useState(['']);

    const [selected, setSelected] = useState('Без авторизации');
    const handleChange = (e) => {
        setSelected(e.target.value);
    }
    // ////////////// Добавление сервреа /////////////////////
    const [lines, setLines] = useState([1]);

    const addServer = () => {
        setServers([...servers, {
            'url1': '',
            'url2': 'null'
        }])
    }

    const addLine = useCallback(() => {
        setLines(lines => [...lines, lines.length+1])
    });    
    const handleDelete = (i) =>{
        const deletLine = [...lines]
        deletLine.splice(i,1)
        setLines(deletLine)
    }


    const onFinish=(values)=>{
        console.log({values});
    }
    

       // ////////////////// Добавление URL 2 ////////////////////////
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
    {lines.map((line,i) =>{
        return(
            <div className={style.wrapper}>
                 <button className="button btn-green" onClick={e => {console.log(servers,typename,type,typeCert,intervl,items)}}>Сохранить</button>
                 <button className="button btn-green" onClick={()=>{addTypename();addServer();addType();addTypecert();addIntervl();addItems()}}>Добавить сервер</button> 
              
        <div className={style.Address}>Сервер {line} 

            <div className={style.AddressButton}>              
                <Button onClick={() => handleDelete(i)}  className={style.buttonDel} type="Success" Success icon={<DeleteOutlined />}>Удалить сервер</Button> 
            </div>
            <Urls/> 
            <Typeavt/>       
            <div className={style.subscription}>
                <Subscription/>             
            </div> 

            
        </div>        
    </div>
            
        )
    })}
    

            <div className={style.AddressButton}>
                {/* <button className="button btn-green" onClick={e => {console.log(typename)}}>Сохранить</button> */}
                {/* <button className="button btn-green" onClick={addServer}>Добавить сервер</button> */}

                <Button onClick={() => addLine()} className={style.buttonAdd} type="Success" Success icon={<PlusOutlined />}>Добавить сервер</Button>
            </div>   
              {/* <button className="button btn-green" onClick={addTypename}>Добавить сервер</button>  */}


    </>  
  )
}
export default Serveropcua;