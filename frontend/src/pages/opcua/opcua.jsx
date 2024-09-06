import React from 'react';
import style from './opcua.module.css';
import Serveropcua from '../../components/server-opcua/server-opcua';
import Restoreopcua from '../../components/restore-opcua/restore-opcua';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export const Opcua = () => {
  const {register, handleSubmit, control, reset, Controller} = useForm()
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'SERVER'
  });
  const onSubmit = (data) =>{
    console.log(data);
    // reset();   
  }

  const [selected, setSelected] = useState('');
  const handleChange = (e) => {
      setSelected(e.target.value);
  }

  return (
    <>
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
       
          {fields.map((field, index) => {
            return(
                <>                
   
            <div key={field.id}>
                <div className={style.Restore}>Восстановить соединение после падения
                    <input type="checkbox" className={style.checkbox}
                    {...register(`SERVER.${index}.restore`)}
                     />
                </div>
                <div className={style.URL1}>URL 1
                    <input type="text" className={style.input1}
                    {...register(`SERVER.${index}.servers.url1`)}                    
                    />
                </div>
                <div className={style.URL1}>URL 2
                    <input type="text" className={style.input2}
                    {...register(`SERVER.${index}.servers.url2`)}                    
                    />
                </div>
                {/* <Typeavt control={control}
                {...register(`SERVER.${index}.servers.utoken_type`)}
                
                /> */}
                
                <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt} >Тип авторизации   
                    <select className={style.select} {...register(`SERVER.${index}.servers.utoken_type`)}>
                        <option   value="Anonymous" >Без авторизации</option>
                        <option   value="username" >По имени пользователя</option>
                        <option   value="cert">По сертификату</option>                     
                    </select>                
                </div> 
                <div className={style.textNotAuto}{...register(`SERVER.${index}.servers.utoken_data`)} >Без авторизации
                    
                </div>

                <div className={style.textAutoLogin}>Логин      
                    <input  type="text" placeholder='Введите логин' className={style.input1} 
                        id='username'
                        {...register(`SERVER.${index}.servers.utoken_data.username`)}
                        control={control}               
                    />
                </div>
                <div className={style.textAutoPass}>Пароль
                    <input placeholder='Введите логин' type="password" className={style.input1} 
                        id='password'
                        {...register(`SERVER.${index}.servers.utoken_data.password`)} 
                        control={control}                   
                    />

                </div>
              




                <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt} >Политка безопрасности  
                    <select className={style.select} {...register(`SERVER.${index}.servers.secpolicy`)}>
                        <option value="None-None">None-None</option>
                        <option value="Basic256Sha256 - Sign">Basic256Sha256 - Sign (uatcp-yasc-uabinary)</option>
                        <option value="Basic256Sha256 - Sign & Encrypt">Basic256Sha256 - Sign & Encrypt (uatcp-uasc-uabinary)</option>
                        <option value="Aes128_Sha256_RasOaep - Sign">Aes128_Sha256_RasOaep - Sign (uatcp-uasc-uabinary)</option>
                        <option value="Aes128_Sha256_RasOaep - Sign & Encrypt">Aes128_Sha256_RasOaep - Sign & Encrypt (uatcp-uasc-uabinary)</option>
                        <option value="Aes256_Sha256_RsaPss - Sign">Aes256_Sha256_RsaPss - Sign (uatcp-uasc-uabinary)</option>
                        <option value="Aes256_Sha256_RsaPss - Sign & Encrypt">Aes256_Sha256_RsaPss - Sign & Encrypt (uatcp-uasc-uabinary)</option>
                        {/* <option   value="cert">По сертификату</option> */}
                    </select> 


                </div> 

                <div value={selected} onChange={(e) => handleChange(e)} className={style.TypeAvt} >Политка безопрасности  
                    <select className={style.select} {...register(`SERVER.${index}.servers.mesmode`)}>
                        <option value="none">none</option>
                        <option value="Sign">Sign</option>
                        <option value="Sign & Encrypt">Sign & Encrypt (значение тега “SignAndEncrypt”)</option>                   
                    </select>                              
                </div>

                <div className={style.titleSub}>Подписка
                    <input type="text"
                     {...register(`SERVER.${index}.servers.subscriptions.interval`)}  

                     />
                     

                    {/* {isAuth && (
                        <>
                            <div className={style.publicMC}>Секция запроса тега</div>
                            <textarea type="text"
                                {...register(`SERVER.${index}.servers.subscriptions.items`)}  
                            
                            />
                        </>
                    )} */}

                          <div className={style.publicMC}>Секция запроса тега</div>
                                <textarea type="text"
                                {...register(`SERVER.${index}.servers.subscriptions.items`)}  
                            
                            />

                </div>   
            </div>
            </>
            ); 
        })}
        

        <button className="button mt-10 mr-4" type="submit">Отправить форму</button>
        <button className="button mt-10" type="button" onClick={ () => append()}>Добавить элемент</button>
      </form>



    </div>
       
    </>
    
  )
}
export default Opcua;