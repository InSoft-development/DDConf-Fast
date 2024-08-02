import React from 'react';
import style from './server-opcua.module.css'
import { Button } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
export const Serveropcua = () => {
    

  return (
    <>
       <div className={style.wrapper}>
        <div className={style.Address}>Сервер
            <div className={style.AddressButton}>
                <Button className={style.buttonDel} type='Success' Success icon={<DeleteOutlined/>}>Удалить сервер</Button>
            </div>
        </div>
       </div>
    </>    
  )
}
export default Serveropcua;