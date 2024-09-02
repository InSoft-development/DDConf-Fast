import React from 'react';
import { useState } from 'react';
import style from './subscription.module.css';
import {DeleteOutlined} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {Input} from 'antd';
import { useCallback } from 'react';
import { Form } from 'antd';
import { spaceChildren } from 'antd/es/button';
const {TextArea} = Input;

const onChange = (e) => {

    console.log(e);
  }

export const Subscription = () => {
  // const [intervl, setIntrvl] = useState([]);
  // const addIntervl = () =>{
  //   setIntrvl([...intervl,{
  //     'subscriptions':[
  //       {
  //         'interval': '',
          
  //       }
  //     ]
  //   }])
  // }
  // const [tag, setTag] = useState([]);
  // const addTag = ()=> {
  //   setTag([...tag,{
  //     'subscriptions':[
  //       {
  //         'items':'',
  //       }        
  //     ]
  //   }])
  // }






    const [lines, setLines] = useState([1]);
    const addLine = useCallback(() => {
      setLines(lines => [...lines, lines.length + 1])
    });
  
    const handleDelete = (i) => {
      const deletLin = [...lines]
      deletLin.splice(i,1)
      setLines(deletLin)
    }

    const onFinish=(values)=>{
      console.log({values});
  }
  
  
  
    return (
      <>
     
      {lines.map((line,i) =>{
        return(
          <div className={style.titleSub} >Подписка {line}
          
          <Form onFinish={onFinish}>
              <Form.Item name="Интервал" label="Интервал публикации в мс" rules={[
                {
                  required: true,
                  message: 'Интервал не заполнен'
                }
              ]}>
                 <Input className={style.inputPublic} placeholder='Введите интервал'/> 
              </Form.Item>
              {/* <button className="button btn-green"onClick={e=>{console.log(intervl)}} >Сохранить</button> */}

               
          </Form>
  
           
     
           <div className={style.publicMC}>Секция запроса тега</div>
           <div className={style.positionPlaceholder}>
                <TextArea  className={style.placeholderteg} placeholder="Введите тег" allowClear onChange={onChange} />
           </div>
           {/* <button className="button btn-green"onClick={e=>{console.log(tag)}} >Сохранить</button> */}
     
           <div className={style.btn}>
                {/* <Button onClick={() => addLine()} className={styles.buttonAdd} type="success" danger icon={<PlusOutlined />}>Добавить подписку</Button> */}
                <Button onClick={() => handleDelete(i)} className={style.buttonDel} type="Success" Success icon={<DeleteOutlined />}>Удалить подписку</Button> 
           </div>   
          </div>
        )
      })}
        <div className={style.btn}>
            <Button onClick={() => addLine()} className={style.buttonAdd} type="Success" Success icon={<PlusOutlined />}>Добавить подписку</Button>             
        </div> 
      </>
    )
  }

export default Subscription;