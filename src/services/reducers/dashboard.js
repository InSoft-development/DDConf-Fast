import { 
    GET_DEVICE_FEATURES,
    GET_DEVICE_FEATURES_SUCCESS,
    GET_DEVICE_FEATURES_FAILED,

    GET_DEVICES_NET,
    GET_DEVICES_NET_SUCCESS,
    GET_DEVICES_NET_FAILED,

    GET_AVAILABLE_PROTOCOLS,
    GET_AVAILABLE_PROTOCOLS_SUCCESS,
    GET_AVAILABLE_PROTOCOLS_FAILED
 } from '../actions/dashboard';

const initialState = {
    serial: '',
    license: '',
    availableProtocols: [],
    devices: [],

    deviceFeaturesRequest: false,
    deviceFeaturesRequestSuccess: false,
    deviceFeaturesRequestFailed: false,

    deviceNetRequest: false,
    deviceNetRequestSuccess: false,
    deviceNetRequestFailed: false,

    availableProtocolsRequest: false,
    availableProtocolsRequestSuccess: false,
    availableProtocolsRequestFailed: false,
}

export const deviceReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DEVICE_FEATURES: {
            return {
                ...state,
                deviceFeaturesRequest: true,
                deviceFeaturesRequestSuccess: false,
                deviceFeaturesRequestFailed: false,
            }
        }
        case GET_DEVICE_FEATURES_SUCCESS: {
            return {
                ...state,
                deviceFeaturesRequest: false,
                deviceFeaturesRequestSuccess: true,
                deviceFeaturesRequestFailed: false,
                serial: action.payload.serial,
                license: action.payload.license
            }
        }
        case GET_DEVICE_FEATURES_FAILED: {
            return {
                ...state,
                deviceFeaturesRequest: false,
                deviceFeaturesRequestSuccess: false,
                deviceFeaturesRequestFailed: true,
            }
        }
        case GET_DEVICES_NET: {
            return {
                ...state,
                deviceNetRequest: true,
                deviceNetRequestSuccess: false,
                deviceNetRequestFailed: false,
            }
        }
        case GET_DEVICES_NET_SUCCESS: {
            return {
                ...state,
                deviceNetRequest: false,
                deviceNetRequestSuccess: true,
                deviceNetRequestFailed: false,
                devices: action.payload
            }
        }
        case GET_DEVICES_NET_FAILED: {
            return {
                ...state,
                deviceNetRequest: false,
                deviceNetRequestSuccess: false,
                deviceNetRequestFailed: true,
            }
        }
        case GET_AVAILABLE_PROTOCOLS: {
            return {
                ...state,
                availableProtocolsRequest: true,
                availableProtocolsRequestSuccess: false,
                availableProtocolsRequestFailed: false,
            }
        }
        case GET_AVAILABLE_PROTOCOLS_SUCCESS: {
            return {
                ...state,
                availableProtocolsRequest: false,
                availableProtocolsRequestSuccess: true,
                availableProtocolsRequestFailed: false,
                availableProtocols: action.payload,
            }
        }
        case GET_AVAILABLE_PROTOCOLS_FAILED: {
            return {
                ...state,
                availableProtocolsRequest: false,
                availableProtocolsRequestSuccess: false,
                availableProtocolsRequestFailed: true,
            }
        }
        default: {
            return state;
        }
    }
}