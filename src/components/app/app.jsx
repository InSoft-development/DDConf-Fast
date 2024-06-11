import React from 'react';
import AppHeader from '../app-header/app-header';
import Profile from '../profile/profile';
import AppDashboard from '../app-dashboard/app-dashboard';
import AppDashboardFiles from '../app-dashboardFiles/app-dashboardFiles';
import AppMek from '../app-mek/app-mek104';
import {Routes, Route, Link} from 'react-router-dom';
import styles from '../../components/app-dashboard/app-dashboard.module.css'
import { Drawer } from "antd";
import { useState } from "react";
import { MenuOutlined } from '@ant-design/icons';




// import {AppDashboard} from '../app-dashboard/app-dashboard';

const App = () => {
   
    return (
        <>
        
    <AppDashboard/>
    <main className='wrapper'>
       
        <Routes>
            
            <Route path='/' element = {<AppDashboardFiles/>}/>
            <Route path='/app-mek104' element = {<Profile/>}/>
        </Routes>
    </main>
                
 
                

        

        </>
        
    );
}

export default App;


