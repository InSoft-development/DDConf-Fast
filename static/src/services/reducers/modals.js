import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from '../actions/modals';

const initialState = {
    sidebarIsOpen: false,
}

export const modalsReducer = (state = initialState, action) => {
    switch(action.type){
        case OPEN_SIDEBAR:{
            return {
                ...state,
                sidebarIsOpen: true,
            }
        }
        case CLOSE_SIDEBAR: {
            return {
                ...state,
                sidebarIsOpen: false,
            }
        }
        default: {
            return state;
        }
    }
}