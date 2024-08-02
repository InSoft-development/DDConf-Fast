import React from 'react';
import style from './restore-opcua.module.css';
import {ConfigProvider} from 'antd';
import {Checkbox} from 'antd';


const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
}

export const Restoreopcua = () => {
  

  return (
    <div className={style.Restore}>Восстановить соединение после падения
        <ConfigProvider theme={{
            token:{
                colorPrimary: 'rgb(40,167,69)'
            }
        }}>

        <Checkbox className={style.checkbox} onChange={onChange} />    

        </ConfigProvider>
    </div>

  )
}
export default Restoreopcua;
