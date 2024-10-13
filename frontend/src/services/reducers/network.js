import { 
    GET_DEVICES_LIST,
    GET_DEVICES_LIST_SUCCESS,
    GET_DEVICES_LIST_FAILED ,
    GET_NETWORK_DEVICE,
    GET_NETWORK_DEVICE_SUCCESS,
    GET_NETWORK_DEVICE_FAILED,

    SET_DEFAULT_SLICE_STATE
} from '../actions/network';

const initialState = {
    listDevices: [],
    selectedDevice: null,
    device: null,

    devicesListRequest: false,
    devicesListRequestSuccess: false,
    devicesListRequestFailed: false,

    deviceFeaturesRequest: false,
    deviceFeaturesRequestSuccess: false,
    deviceFeaturesRequestFailed: false,
}

export const networkReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DEVICES_LIST:{
            return {
                ...state,
                devicesListRequest: true,
                devicesListRequestSuccess: false,
                devicesListRequestFailed: false,
            }
        }
        case GET_DEVICES_LIST_SUCCESS:{
            return {
                ...state,
                devicesListRequest: false,
                devicesListRequestSuccess: true,
                devicesListRequestFailed: false,

                listDevices: action.payload
            }
        }
        case GET_DEVICES_LIST_FAILED:{
            return {
                ...state,
                devicesListRequest: false,
                devicesListRequestSuccess: false,
                devicesListRequestFailed: true,
            }
        }
        case GET_NETWORK_DEVICE:{
            return {
                ...state,
                deviceFeaturesRequest: true,
                deviceFeaturesRequestSuccess: false,
                deviceFeaturesRequestFailed: false,
            }
        }
        case GET_NETWORK_DEVICE_SUCCESS:{
            return {
                ...state,
                deviceFeaturesRequest: false,
                deviceFeaturesRequestSuccess: true,
                deviceFeaturesRequestFailed: false,

                device: action.payload
            }
        }
        case GET_NETWORK_DEVICE_FAILED:{
            return {
                ...state,
                deviceFeaturesRequest: false,
                deviceFeaturesRequestSuccess: false,
                deviceFeaturesRequestFailed: true,
            }
        }
        case SET_DEFAULT_SLICE_STATE:{
            return {
                ...initialState
            }
        }
        default: {
            return state;
        }
    }
}