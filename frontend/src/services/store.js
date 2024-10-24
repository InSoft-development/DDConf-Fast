import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { modalsReducer } from './reducers/modals';
import {profileReducer} from './reducers/profile';
import dashboardSlice from './slices/dashboard';
import { opcuaReducer } from './reducers/opc-ua';
import { profileEditorReducer } from './reducers/profile-editor';
import { networkReducer } from './reducers/network';

const rootReducer = combineReducers({
    profile: profileReducer,
    modals: modalsReducer,
    dashboard: dashboardSlice,
    opcua: opcuaReducer,
    profileEditor: profileEditorReducer,
    network: networkReducer
});

export const store = configureStore({
    reducer: rootReducer,
});