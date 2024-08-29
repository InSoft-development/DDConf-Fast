import React from 'react';
import style from './subscriptionForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useCallback } from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {Input} from 'antd';
import { Form } from 'antd';
const {TextArea} = Input;



const onChange = (e) => {
    console.log(e);
}

export const SubscriptionForm = ({control}) => {
   


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
  const {
    register,        
    formState:{
      errors,     
    },        
  } = useForm()




  return (
    <>
     
      {lines.map((line,i) =>{
        return(
          <div className={style.titleSub} >Подписка {line}
               <Controller                           
            id="interval"            
            {...register('servers.subscriptions.interval')}
            control={control}
            render={({field})=><Input className={style.inputPublic} placeholder='Введите интервал' {...field}/>  }                 
        />
          
   
          
                 
         
            

               
        
  
           
     
           <div className={style.publicMC}>Секция запроса тега</div>



           <div className={style.positionPlaceholder}>
           <Controller                           
            id="items"            
            {...register('servers.subscriptions.items')}
            control={control}
            render={({field})=><TextArea  className={style.placeholderteg} placeholder="Введите тег" allowClear onChange={onChange} {...field} /> }                 
        />

                
           </div>


          
           <div className={style.btn}>
             
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
export default SubscriptionForm;