import React from 'react';
import Serveropcua from '../../components/server-opcua/server-opcua';
import Restoreopcua from '../../components/restore-opcua/restore-opcua';

export const Opcua = () => {
  return (
    <>
        <Restoreopcua/>
        <Serveropcua/>    
    </>
    
  )
}
export default Opcua;