import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { modalsReducer } from './reducers/modals';
import {profileReducer} from './reducers/profile';

const rootReducer = combineReducers({
    profile: profileReducer,
    modals: modalsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
})