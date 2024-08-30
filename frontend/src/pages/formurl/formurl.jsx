import React from 'react';
import style from './formurl.module.css'
import ServerFormul from '../../components/server-formurl/serverFormul';
import ServeruseForm from '../../components/SERVERUseForm/serveruseForm';
import TestForm from '../../components/testForm/testForm';












export const Formurl = () => {


  return (
    <> 
      {/* <ServerFormul/>     */}
      <ServeruseForm/>

      <TestForm/>
    </>
   
  )
}
export default Formurl;