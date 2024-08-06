import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import style from './server-opcua.module.css'
import { Button, Input } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons';
import Notauthorization from '../not_authorization/notauthorization';
import Authorization from '../authorization/authorization';
import Certificatee from '../certificatee/certificatee';
import Subscription from '../subscription/subscription';
import {Select} from 'antd';
import { Option } from 'antd/es/mentions';
import {Form} from 'antd';








export const Serveropcua = () => {
   // const fruits = ['banana', 'mango','apple'];
//    const [value, setValue] = useState('');
//    const options = [
//     {label: "red", value: 1},
//     {label: "green", value: 2},
//     {label: "yellow", value: 3},
//    ]
//    function handleSelect(event){
//     setValue(event.target.value)

//    }


    
    const [selected, setSelected] = useState('Без авторизации');
    const handleChange = (e) => {
        setSelected(e.target.value);
    }
    
    const [lines, setLines] = useState([1]);
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
    

  return (
    <>
    {lines.map((line,i) =>{
        return(
            <div className={style.wrapper}>
              
        <div className={style.Address}>Сервер {line} 
            <div className={style.AddressButton}>
              
                <Button onClick={() => handleDelete(i)}  className={style.buttonDel} type="Success" Success icon={<DeleteOutlined />}>Удалить сервер</Button> 
            </div>


            <Form onFinish={onFinish} style={{width: 500}}>  
                          
            <Form.Item name="URL 1" label="URL 1" rules={[
                {
                   
                    required:true,
                    message: 'URL 1 не заполнен',  
                }
            ]} >
                        {/* <div className={style.URL1}>URL 1 */}                        
                                <Input className={style.input1} placeholder='Введите URL 1'/>                                            
                        {/* </div> */}
            </Form.Item>
              

            <Form.Item rules={[
                {
                    required:true,
                    message: "URL 2 не заполнен", 
                }
            ]} name={"URL 2"} label="URL 2">
            {/* <div className={style.URL1}>URL 2 */}
                <Input className={style.input2} placeholder='Введите URL 2'/>          
            {/* </div>  */}
            </Form.Item>


            <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt}>Тип авторизации
                <select className={style.select}>
                    <option value="Без авторизации">Без авторизации</option>
                    <option value="Авторизация">Авторизация</option>
                    <option value="Сертификат">Сертификат</option>
                </select> 
                          
            </div> 
            
            <div className={style.AotoPol}>
                {selected == "Без авторизации"?<Notauthorization/>:""}
                {selected == "Авторизация"?<Authorization/>:""}
                {selected == "Сертификат"?<Certificatee/>:""}             
            </div>



            {/* <Select mode='multiple' placeholder='add' style={{width: '30%'}}>
                {fruits.map((fruit, index)=>{                  
                        return<Select.Option key={index} value={fruit}/>                 
                   
                })}

            </Select> */}

</Form>    

            <div className={style.subscription}>
                <Subscription/>             
            </div> 
           



            {/* <select className={style.TypeAvt} onChange={handleSelect}>
                {options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ) )}


            </select>

            <p>{label}</p> */}

           

         


            
        </div>
         
    </div>
            
        )
    })}

            <div className={style.AddressButton}>
                <Button onClick={() => addLine()} className={style.buttonAdd} type="Success" Success icon={<PlusOutlined />}>Добавить сервер</Button>
            </div>

    
      
    </>  
  )
}
export default Serveropcua;