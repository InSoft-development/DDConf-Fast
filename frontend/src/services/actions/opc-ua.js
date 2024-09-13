import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';

export const GET_OPCUA_FORM_DATA = 'GET_OPC_UA_FORM_DATA';
export const GET_OPCUA_FORM_DATA_SUCCESS = 'GET_OPC_UA_FORM_DATA_SUCCESS';
export const GET_OPCUA_FORM_DATA_FAILED = 'GET_OPC_UA_FORM_DATA_FAILED';

export const SEND_OPCUA_FORM_DATA = 'SEND_OPC_UA_FORM_DATA';
export const SEND_OPCUA_FORM_DATA_SUCCESS = 'SEND_OPC_UA_FORM_DATA_SUCCESS';
export const SEND_OPCUA_FORM_DATA_FAILED = 'SEND_OPC_UA_FORM_DATA_FAILED';

export const getOpcUaForm = () => (dispatch) => {
    dispatch({type: GET_OPCUA_FORM_DATA})
    request('opcua','fetch_ua')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_OPCUA_FORM_DATA_SUCCESS,
                payload: res.result
            })
        })
        .catch(error => {
            dispatch({type: GET_OPCUA_FORM_DATA_FAILED})
        })
}

export const sendOpcUaForm = (form) => (dispatch) => {
    dispatch({type: SEND_OPCUA_FORM_DATA})
    request('opcua','post_ua', form)
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: SEND_OPCUA_FORM_DATA_SUCCESS,
                payload: res.result
            })
        })
        .catch(error => {
            dispatch({type: SEND_OPCUA_FORM_DATA_FAILED})
        })
}

