import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfiles } from '../../services/actions/profile';
import Layout from '../layout/layout';
import Profile from '../profile/profile';
import SignIn from '../../pages/sign-in/sign-in';
import ProfileEditor from '../../pages/profile-editor/profile-editor';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfiles());
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Profile/>}></Route>
                    <Route path='profile-editor' element={<ProfileEditor/>}></Route>
                </Route>
                <Route path='/sign-in' element={<SignIn/>}></Route>
            </Routes>
        </>
    );
}

export default App;


