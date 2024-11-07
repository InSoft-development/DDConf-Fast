import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import modalsReducer from './slices/modals';
import {profileReducer} from './reducers/profile';
import dashboardSlice from './slices/dashboard';
import opcuaSlice from './slices/opcua';
import { profileEditorReducer } from './reducers/profile-editor';
import { networkReducer } from './reducers/network';

const rootReducer = combineReducers({
    profile: profileReducer,
    modals: modalsReducer,
    dashboard: dashboardSlice,
    opcua: opcuaSlice,
    profileEditor: profileEditorReducer,
    network: networkReducer
});

export const store = configureStore({
    reducer: rootReducer,
});