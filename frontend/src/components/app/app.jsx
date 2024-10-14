import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout';
import { SignIn, Dd104, Dashboard, OpcUa, ProfileEditor, Network } from '../../pages';

const App = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={
                        <Dashboard headerTitle={'Дашборд'} />
                    }></Route>
                    <Route path='dd104' element={
                        <Dd104 headerTitle={'Протокол МЭК 104'} />
                    }>
                    </Route>
                    <Route path='profile-editor' element={
                        <ProfileEditor headerTitle={'Протокол МЭК 104'} />
                    }></Route>
                    <Route path='opcua' element={
                        <OpcUa headerTitle={'OPC UA'} />
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