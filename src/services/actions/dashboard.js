import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';

export const GET_DEVICE_FEATURES = 'GET_DEVICE_FEATURES';
export const GET_DEVICE_FEATURES_SUCCESS = 'GET_DEVICE_FEATURES_SUCCESS';
export const GET_DEVICE_FEATURES_FAILED = 'GET_DEVICE_FEATURES_FAILED';

export const GET_DEVICES_NET = 'GET_DEVICES_NET';
export const GET_DEVICES_NET_SUCCESS = 'GET_DEVICES_NET_SUCCESS';
export const GET_DEVICES_NET_FAILED = 'GET_DEVICES_NET_FAILED';

export const getDeviceFeatures = () => (dispatch) => {
    dispatch({type: GET_DEVICE_FEATURES});
    request('dashboard', 'fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_DEVICE_FEATURES_SUCCESS,
                payload: res.result
            });
        })
        .catch(error => {
            dispatch({type: GET_DEVICE_FEATURES_FAILED})
        })
}

export const getDevicesNet = () => (dispatch) => {
    dispatch({type: GET_DEVICES_NET});
    request('dashboard', 'fetch_net')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_DEVICES_NET_SUCCESS,
                payload: res.result.map((device, index) => {
                    return {
                        ...device,
                        id: index
                    }
                })
            })
        })
        .catch(error => {
            dispatch({type: GET_DEVICES_NET_FAILED})
        })
}