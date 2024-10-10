import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';

const Layout = () => {

    return (
        <>
            <Sidebar/>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
