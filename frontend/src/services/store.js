import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { 
    dashboardSlice,
    modalsSlice,
    networkSlice,
    opcuaSlice
} from './slices';
import { profileEditorReducer } from './reducers/profile-editor';
import { profileReducer } from './reducers/profile';

const rootReducer = combineReducers({
    modals: modalsSlice,
    dashboard: dashboardSlice,
    opcua: opcuaSlice,
    network: networkSlice,
    profile: profileReducer,
    profileEditor: profileEditorReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});