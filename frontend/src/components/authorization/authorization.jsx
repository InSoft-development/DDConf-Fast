import React from 'react';
import { Input, Form } from 'antd';
import style from './authorization.module.css';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

export const Authorization = () => {
  return (
    // <div className={style.textAuto}>Авторизация
    // <div>
    //     <Input className={style.input1} placeholder='Введите Логин'/>
    // </div>

    // <div>
    //     <Input className={style.input2} placeholder='Введите пароль'/>
    // </div>
    
    // </div>


    

   
    <Form
    name="basic"
    labelCol={{
      span: 5,
    }}
    // wrapperCol={{
    //   span: 20,
    // }}
    // style={{
    //   maxWidth: 500,
    // }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
   
    <div className={style.input}>
          <Form.Item 
      label="Логин"
      // style={{marginLeft:140, marginTop:20}}
      className={style.input1}
      name="Логин"
      rules={[
        {
          required: true,
          message: 'Введите Логин!',
        },
      ]}
    >
      <Input placeholder='Введите логин'  />
    </Form.Item>
  

   
    <Form.Item
      label="Пароль"
      className={style.input2}
      name="password"
      rules={[
        {
          required: true,
          message: 'Введите пароль!',
        },
      ]}
    >
      <Input.Password placeholder='Введите пароль' />
    </Form.Item>
    </div>
   

    


  </Form>
 
  )
}
export default Authorization;