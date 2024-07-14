import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { modalsReducer } from './reducers/modals';
import {profileReducer} from './reducers/profile';
import { deviceReducer } from './reducers/dashboard';

const rootReducer = combineReducers({
    profile: profileReducer,
    modals: modalsReducer,
    device: deviceReducer
});

export const store = configureStore({
    reducer: rootReducer,
})