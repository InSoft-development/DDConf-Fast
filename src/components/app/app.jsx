import { useDispatch } from 'react-redux';
import Layout from '../layout/layout';
import { Routes, Route } from 'react-router-dom';
// pages
import SignIn from '../../pages/sign-in/sign-in';
import Dd104 from '../../pages/dd104/dd104';
import Dashboard from '../../pages/dashboard/dashboard';
import { useEffect } from 'react';
import {getDeviceFeatures, getAvailableProtocols} from '../../services/actions/dashboard'


const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeviceFeatures())
        dispatch(getAvailableProtocols())
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='dashboard' element={<Dashboard/>}></Route>
                    <Route path='dd104' element={<Dd104/>}></Route>
                    
                    {/* <Route path='profile-editor' element={<ProfileEditor/>}></Route> */}
                </Route>
                <Route path='/sign-in' element={<SignIn/>}></Route>
            </Routes>
        </>
    );
}

export default App;


