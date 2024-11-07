import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarIsOpen: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialState,
    reducers: {
        openSidebar: state => {
            state.sidebarIsOpen = true;
        },
        closeSidebar: state => {
            state.sidebarIsOpen = false;
        }
    }
});

export const { openSidebar, closeSidebar } = modalsSlice.actions;
export default modalsSlice.reducer;