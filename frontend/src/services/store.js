import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { modalsReducer } from './reducers/modals';
import {profileReducer} from './reducers/profile';
import { deviceReducer } from './reducers/dashboard';
import { opcuaReducer } from './reducers/opc-ua';

import { formReduserNetwork } from './reducers/network';

const rootReducer = combineReducers({
    profile: profileReducer,
    modals: modalsReducer,
    device: deviceReducer,
    opcua: opcuaReducer,
    network: formReduserNetwork
});

export const store = configureStore({
    reducer: rootReducer,
})