import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { modalsReducer } from './reducers/modals';
import {profileReducer} from './reducers/profile';
import { deviceReducer } from './reducers/dashboard';
import { opcuaReducer } from './reducers/opc-ua';
import { profileEditorReducer } from './reducers/profile-editor';

const rootReducer = combineReducers({
    profile: profileReducer,
    modals: modalsReducer,
    device: deviceReducer,
    opcua: opcuaReducer,
    profileEditor: profileEditorReducer
});

export const store = configureStore({
    reducer: rootReducer,
})