import { useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Sidebar from '../sidebar/sidebar';
import { Outlet } from 'react-router-dom';



const Layout = () => {

    const {sidebarIsOpen} = useSelector(state => state.modals);

    return (
        <>
            {sidebarIsOpen && <Sidebar/>}
            <AppHeader />
            <main className='wrapper'>
                <Outlet/>
            </main>
            
        </>
    );
}

export default Layout;
