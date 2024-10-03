import AppHeader from '../app-header/app-header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';

const Layout = () => {

    return (
        <>
            <Sidebar/>

            <AppHeader />
            <main className='wrapper'>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
