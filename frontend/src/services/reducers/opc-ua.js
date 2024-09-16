import {
    GET_OPCUA_FORM_DATA,
    GET_OPCUA_FORM_DATA_SUCCESS,
    GET_OPCUA_FORM_DATA_FAILED,

    SEND_OPCUA_FORM_DATA,
    SEND_OPCUA_FORM_DATA_SUCCESS,
    SEND_OPCUA_FORM_DATA_FAILED
} from '../actions/opc-ua';

const initialState = {
    form: {},

    getFormRequest: false,
    getFormRequestSuccess: false,
    getFormRequestFailed: false,

    sendFormRequest: false,
    sendFormRequestSuccess: false,
    sendFormRequestFailed: false,
}

export const opcuaReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_OPCUA_FORM_DATA: {
            return {
                ...state,
                getFormRequest: true,
                getFormRequestSuccess: false,
                getFormRequestFailed: false,
            }
        }
        case GET_OPCUA_FORM_DATA_SUCCESS: {
            return {
                ...state,
                getFormRequest: false,
                getFormRequestSuccess: true,
                getFormRequestFailed: false,
                form: action.payload
            }
        }
        case GET_OPCUA_FORM_DATA_FAILED: {
            return {
                ...state,
                getFormRequest: false,
                getFormRequestSuccess: false,
                getFormRequestFailed: true,
            }
        }
        case SEND_OPCUA_FORM_DATA: {
            return {
                ...state,
                sendFormRequest: true,
                sendFormRequestSuccess: false,
                sendFormRequestFailed: false
            }
        }
        case SEND_OPCUA_FORM_DATA_SUCCESS: {
            return {
                ...state,
                sendFormRequest: false,
                sendFormRequestSuccess: true,
                sendFormRequestFailed: false
            }
        }
        case SEND_OPCUA_FORM_DATA_FAILED: {
            return {
                ...state,
                sendFormRequest: false,
                sendFormRequestSuccess: false,
                sendFormRequestFailed: true
            }
        }
        default: {
            return state;
        }
    }
}