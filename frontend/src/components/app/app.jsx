import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
// pages
import Layout from '../layout/layout';

import SignIn from '../../pages/sign-in/sign-in';
import Dd104 from '../../pages/dd104/dd104';
import Dashboard from '../../pages/dashboard/dashboard';
import ProfileEditor from '../../pages/profile-editor/profile-editor';
import OpcUa from '../../pages/opc-ua/opc-ua';
// services
import {getDeviceFeatures} from '../../services/actions/dashboard'
import { getProfiles } from '../../services/actions/profile';


const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfiles());
        dispatch(getDeviceFeatures())
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Dashboard/>}></Route>
                    <Route path='dd104' element={<Dd104/>}></Route>
                    <Route path='profile-editor' element={<ProfileEditor/>}></Route>
                    <Route path='opcua' element={<OpcUa/>}></Route>
                </Route>
                <Route path='/sign-in' element={<SignIn/>}></Route>
            </Routes>
        </>
    );
}

export default App;


