import React from 'react';
import AppHeader from '../app-header/app-header';
import Profile from '../profile/profile';
import AppDashboard from '../app-dashboard/app-dashboard';
import AppDashboardFiles from '../app-dashboardFiles/app-dashboardFiles';
import AppMek from '../app-mek/app-mek104';
import {Routes, Route, Link} from 'react-router-dom';



// import {AppDashboard} from '../app-dashboard/app-dashboard';

const App = () => {
    return (
        <>
        {/* <AppDashboard/> */}
        {/* <main className='wrapper'>
            <dashboardFiles/>
        </main> */}
           
            <AppDashboard/> 
             <main className='wrapper'>               
                <AppDashboardFiles/>
                
{/* 
                <Routes>
                    <Route path='/' element={<AppDashboardFiles/>}/>
                    <Route path='/profile' element={<Profile/>} />
                </Routes> */}
            </main>

        </>
        
    );
}

export default App;


