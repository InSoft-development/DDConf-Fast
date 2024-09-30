import React, { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import style from './network.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Flex } from 'antd';
import { SET_FORM_NETWORK } from '../../services/actions/network';
import data from '../../json/network.json';
import datadevice from '../../json/device.json';
import { ReloadOutlined } from '@ant-design/icons';
 





export const Network = () => {

  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    dispatch({
      type: SET_FORM_NETWORK,
      payload: data
    })
    console.log(data);
  }

const [contacts] = useState(data);
const [devices] = useState(datadevice);


const [device, setDevice] = useState()


 


  





  return (
    <>
    
    <form onSubmit={handleSubmit(onSubmit)} className={`text text-18 ${style.form}`}>
    

      {/* <div>
        <label className='fw-b label-required-symbol' htmlFor={`result.device`}>Устройства</label>
        <select className={`opc-input ${style.device}`} name="device" id={`result.device`} {...register(`result.device`)}>
          <option value="br-lan">br-lan</option>
          <option value="br-lan_1">br-lan_1</option>
          <option value="br-lan_2">br-lan_2</option>
          <option value="br-lan_3">br-lan_3</option>
        </select>        
      </div> */}
      <div>
        <label className='fw-b label-required-symbol' htmlFor={`result.device`}>Устройства</label>
        
        <select className={`opc-input ${style.device}`} name="device" id={`result.device`} {...register(`result.device`)} value={device} onChange={e=>setDevice(e.target.value)}>
        {devices.map((device)=>
        <option value={device.name}>{device.name}</option>        
        )}
        </select>        
      </div>


      {/* <Flex className='mt-30'> */}
      <div className='mt-30'>
          <label className='fw-b label-required-symbol' htmlFor="status">Статус</label>  
          
          <button type='button' className={`button btn-circle  btn-green ${style.restart}`}><ReloadOutlined/></button>       
            <div className={style.card} >  
              <table className={style.tabel}>


              {/* <tbody>
              {devices.map((device)=>       
                  <tr>                           
                    <td value={device.name} className={style.numberStr}></td>
                    <td className={style.numberIP}>{device}</td>                 
                  </tr>  )}         
              </tbody>    */}


                <tbody>
                  {contacts.map((contact)=><tr>                           
                    <td className={style.numberStr}>{contact.title}</td>
                    <td className={style.numberIP}>{contact.completed}</td>                  
                  </tr>)}                    
                </tbody>         
              </table>            
            </div>          
      </div>
   
     
       

      


     

      
      {/* </Flex> */}
     
      <div className='mt-30'>      
        <label className='fw-b label-required-symbol mr-40' htmlFor={`result.protocol`}>Протоколы</label>
        <select className={`opc-input ml-30 ${style.address}`} name="protocol" id={`result.protocol`} {...register(`result.protocol`)}>
          <option value="static address">static address</option>
          <option value="dynamic address">dynamic address</option>      
        </select>
      </div>

      <div className='mt-30'>      
        <label className='fw-b label-required-symbol mr-40' htmlFor={`result.ipv4.address`}>IPv4 адресс</label>
        <input
         type="text"
         id={`result.ipv4.address`}
         placeholder='Введите IPv4 адресс'
         className={`opc-input ${style.ipv4}`}
         {...register(`result.ipv4.address`)}
         />
      </div>

      <div className='mt-30'>      
        <label className='fw-b label-required-symbol mr-40' htmlFor={`result.ipv4.netmask`}>IPv4 маска</label>
        <input
         type="text"
         id={`result.ipv4.netmask`}
         placeholder='Введите IPv4 маску'
         className={`opc-input ${style.ipv4netmask}`}
         {...register(`result.ipv4.netmask`)}
         />
      </div>

      <div className='mt-30'>      
        <label className='fw-b label-required-symbol mr-40' htmlFor={`result.ipv4.gateway`}>IPv4 шлюз</label>
        <input
         type="text"
         id={`result.ipv4.gateway`}
         placeholder='Введите IPv4 шлюз'
         className={`opc-input ${style.ipv4gateway}`}
         {...register(`result.ipv4.gateway`)}
         />
      </div>

      <div className='mt-30'>      
        <label className='fw-b label-required-symbol mr-40' htmlFor={`result.ipv4.broadcast`}>IPv4 диапазон <br></br> широковещания</label>
        <input
         type="text"
         id={`result.ipv4.broadcast`}
         placeholder='Введите IPv4 диапазон широковещания'
         className={`opc-input ${style.ipv4broadcast}`}
         {...register(`result.ipv4.broadcast`)}
         />
      </div>


    <div className={style.btn}>
      <button  type='submit' className='button btn-green mt-10'>Отправить</button>
    </div>  
    </form>
       
    </>
    
  )
}
export default Network;