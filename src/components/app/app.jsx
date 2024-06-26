import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfiles } from '../../services/actions/profile';
import Layout from '../layout/layout';
import { Routes, Route } from 'react-router-dom';
// pages
import SignIn from '../../pages/sign-in/sign-in';
import ProfileEditor from '../../pages/profile-editor/profile-editor';
import Dd104 from '../../pages/dd104/dd104';


const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='dd104' element={<Dd104/>}></Route>
                    <Route path='profile-editor' element={<ProfileEditor/>}></Route>
                </Route>
                <Route path='/sign-in' element={<SignIn/>}></Route>
            </Routes>
        </>
    );
}

export default App;


