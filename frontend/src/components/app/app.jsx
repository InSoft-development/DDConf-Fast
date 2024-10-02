import { Routes, Route } from 'react-router-dom';

// pages
import Layout from '../layout/layout';

import Login from '../../pages/sign-in/sign-in';
import Dd104 from '../../pages/dd104/dd104';
import Dashboard from '../../pages/dashboard/dashboard';
import OpcUa from '../../pages/opc-ua/opc-ua';
import ProfileEditor from '../../pages/profile-editor/profile-editor';
import Network from '../../pages/network/network';

const App = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Dashboard/>}></Route>
                    <Route path='dd104' element={<Dd104/>}></Route>
                    <Route path='opcua' element={<OpcUa/>}></Route>
                    <Route path='network' element={<Network/>}></Route>
                    <Route path='profile-editor' element={<ProfileEditor/>}></Route>
                </Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </>
    );
}

export default App;