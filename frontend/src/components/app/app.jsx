import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitial, fetchProtocols } from '../../services/slices/dashboard';
import Layout from '../layout/layout';
import { SignIn, Dd104, Dashboard, OpcUa, ProfileEditor, Network } from '../../pages';
import ProtectedRoute from '../../hoc/protected-route';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInitial());
        dispatch(fetchProtocols());
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={
                        <Dashboard headerTitle={'Дашборд'} />
                    }></Route>
                    <Route path='dd104' element={
                        <ProtectedRoute protocol={'dd104'}>
                            <Dd104 headerTitle={'Протокол МЭК 104'} />
                        </ProtectedRoute>
                    }>
                    </Route>
                    <Route path='profile-editor' element={
                        <ProtectedRoute protocol={'dd104'}>
                            <ProfileEditor headerTitle={'Протокол МЭК 104'} />
                        </ProtectedRoute>
                    }></Route>
                    <Route path='opcua' element={
                        <ProtectedRoute protocol={'opcua'}>
                            <OpcUa headerTitle={'OPC UA'} />
                        </ProtectedRoute>
                    }></Route>
                    <Route path='network' element={
                        <Network headerTitle={'Сетевые интерфейсы'} />
                    }></Route>
                </Route>
                <Route path='/login' element={<SignIn />}></Route>
            </Routes>
        </>
    );
}

export default App;