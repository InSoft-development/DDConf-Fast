import { checkResponce } from '../../utils/checkResponce';
import { request } from '../../services/api';

export const GET_DEVICES_LIST = 'network/GET_DEVICES_LIST';
export const GET_DEVICES_LIST_SUCCESS = 'network/GET_DEVICES_LIST_SUCCESS';
export const GET_DEVICES_LIST_FAILED = 'network/GET_DEVICES_LIST_FAILED';

export const GET_NETWORK_DEVICE = 'network/GET_NETWORK_DEVICE';
export const GET_NETWORK_DEVICE_SUCCESS = 'network/GET_NETWORK_DEVICE_SUCCESS';
export const GET_NETWORK_DEVICE_FAILED = 'network/GET_NETWORK_DEVICE_FAILED';

export const SEND_DEVICE_FEATURES = 'network/SEND_DEVICE_FEATURES';
export const SEND_DEVICE_FEATURES_SUCCESS = 'network/SEND_DEVICE_FEATURES_SUCCESS';
export const SEND_DEVICE_FEATURES_FAILED = 'network/SEND_DEVICE_FEATURE_FAILED';

export const SET_DEFAULT_SLICE_STATE = 'network/SET_DEFAULT_SLICE_STATE';

export const getDevices = () => (dispatch) => {
    dispatch({type: GET_DEVICES_LIST});
    request('network', 'list_devices')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_DEVICES_LIST_SUCCESS,
                payload: res.result.map(list => {
                    return {
                        value: list,
                        text: list,
                    }
                })
            })
        })
        .catch(error => {
            dispatch({type: GET_DEVICES_LIST_FAILED})
        })
}

export const getDeviceFeatures = (id) => (dispatch) => {
    dispatch({type: GET_NETWORK_DEVICE});
    request('network', 'fetch_device', {
            id: id
        })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_NETWORK_DEVICE_SUCCESS,
                payload: res.result
            })
        })
        .catch(error => {
            dispatch({type: GET_NETWORK_DEVICE_FAILED})
        })
}

export const saveDeviceFeatures = (data) => (dispatch) => {
    dispatch({type: SEND_DEVICE_FEATURES});
    request('network', 'save_device', {
        ...data
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: SEND_DEVICE_FEATURES_SUCCESS })
        })
        .catch(error => {
            dispatch({type: SEND_DEVICE_FEATURES_FAILED})
        })
}