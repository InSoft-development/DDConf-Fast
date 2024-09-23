import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';

// initial request dd104 (get active profile, list of profiles)
export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCESS = 'PROFILE_REQUEST_SUCCESS';
export const PROFILE_REQUEST_FAILED = 'PROFILE_REQUEST_FAILED';

// get active table
export const GET_ACTIVE_TABLE = 'GET_ACTIVE_TABLE';
export const GET_ACTIVE_TABLE_SUCCESS = 'GET_ACTIVE_TABLE_SUCCESS';
export const GET_ACTIVE_TABLE_FAILED = 'GET_ACTIVE_TABLE_FAILED';

// get table by profile name
export const GET_TABLE_BY_PROFILE_NAME = 'GET_TABLE_BY_PROFILE_NAME';
export const GET_TABLE_BY_PROFILE_NAME_SUCCESS = 'GET_TABLE_BY_PROFILE_NAME_SUCCESS';
export const GET_TABLE_BY_PROFILE_NAME_FAILED = 'GET_TABLE_BY_PROFILE_NAME_FAILED';

// about active profile property not data
export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE_SUCCESS';
export const CHANGE_PROFILE_FAILED = 'CHANGE_PROFILE_FAILED';

export const CHANGE_PROCESS_STATUS = 'CHANGE_PROCCESS_STATUS';
export const CHANGE_PROCESS_STATUS_SUCCESS = 'CHANGE_PROCCESS_STATUS_SUCCESS';
export const CHANGE_PROCESS_STATUS_FAILED = 'CHANGE_PROCCESS_STATUS_FAILED';

// save profile
export const SAVE_PROFILE = "SAVE_PROFILE";
export const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";
export const SAVE_PROFILE_FAILED = "SAVE_PROFILE_FAILED";


export const getProfiles = (cb = null) => (dispatch) => {
    dispatch({ type: PROFILE_REQUEST });
    request('dd104', 'fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: PROFILE_REQUEST_SUCCESS, payload: res.result })
            
            if(cb){
                cb();
            }

        })
        .catch(error => {
            dispatch({ type: PROFILE_REQUEST_FAILED })
        })
}

export const getActiveTable = () => (dispatch) => {
    dispatch({type: GET_ACTIVE_TABLE});
    request('dd104', 'fetch_table')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: GET_ACTIVE_TABLE_SUCCESS, payload: res.result})
        })
        .catch(error => {
            dispatch({type: GET_ACTIVE_TABLE_FAILED})
        })
}

export const changeProfile = (profileName, cb = null) => (dispatch) => {
    dispatch({type: CHANGE_PROFILE, payload: profileName});
    request('dd104','profile_apply', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: CHANGE_PROFILE_SUCCESS})
        
            if(cb){
                cb();
            }

        })
        .catch(error => {
            dispatch({type: CHANGE_PROFILE_FAILED})
        })
}

export const changeProсess = (actionIndex, processId) => (dispatch) => {
    dispatch({ type: CHANGE_PROCESS_STATUS, payload: processId })
    request('dd104','process_handle', {
        pid: processId,
        op: actionIndex
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: CHANGE_PROCESS_STATUS_SUCCESS, payload: res.result })
        })
        .catch(error => {
            dispatch({ type: CHANGE_PROCESS_STATUS_FAILED })
        })
}

// export const profileSave = (name, data) => (dispatch) => {
//     dispatch({type: SAVE_PROFILE})
//     request('dd104', 'profile_save', {
//         name,
//         data
//     })
//         .then(res => checkResponce(res))
//         .then(res => {
//             dispatch({type: SAVE_PROFILE_SUCCESS})
//         })
//         .catch(error => {
//             dispatch({type: SAVE_PROFILE_FAILED})
//         })
// }



