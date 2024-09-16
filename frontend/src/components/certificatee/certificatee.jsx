import React from 'react';
import style from './certificatee.module.css';
import {Input} from 'antd';

export const Certificatee = () => {
  return (
    <div className={style.textSert}>Сертификат
        <div>
            <Input className={style.input1}/>
        </div>
        <div>
            <Input className={style.input2}/>
        </div>
    
    </div>
  )
}
export default Certificatee;