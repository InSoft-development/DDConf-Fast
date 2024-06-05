import React from 'react';
import AppHeader from '../app-header/app-header';
import Profile from '../profile/profile';
import AppDashboard from '../app-dashboard/app-dashboard';
import AppDashboardFiles from '../app-dashboardFiles/app-dashboardFiles';


// import {AppDashboard} from '../app-dashboard/app-dashboard';

const App = () => {
    return (
        <>
        {/* <AppDashboard/> */}
        {/* <main className='wrapper'>
            <dashboardFiles/>
        </main> */}
           
            <AppHeader/> 
             <main className='wrapper'>
                {/* <Profile/> */}
                {/* <AppDashboard/> */}
                <AppDashboardFiles/>
            </main>

        </>
        
    );
}

export default App;


