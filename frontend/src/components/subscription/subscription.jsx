import React from 'react';
import { useState } from 'react';
import style from './subscription.module.css';
import {DeleteOutlined} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {Input} from 'antd';
import { useCallback } from 'react';
import { spaceChildren } from 'antd/es/button';
const {TextArea} = Input;

const onChange = (e) => {
    console.log(e);
  }

export const Subscription = () => {
    const [lines, setLines] = useState([1]);
    const addLine = useCallback(() => {
      setLines(lines => [...lines, lines.length + 1])
    });
  
    const handleDelete = (i) => {
      const deletLin = [...lines]
      deletLin.splice(i,1)
      setLines(deletLin)
    }
  
  
    return (
      <>
     
      {lines.map((line,i) =>{
        return(
          <div className={style.titleSub} >Подписка {line}
  
           <div className={style.publicMC}>Интервал публикации в мс
                <Input className={style.inputPublic} placeholder='Введите интервал'/>          
           </div>
     
           <div className={style.publicMC}>Секция запроса тега</div>
           <div className={style.positionPlaceholder}>
                <TextArea className={style.placeholderteg} placeholder="Введите тег" allowClear onChange={onChange} />
           </div>
     
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