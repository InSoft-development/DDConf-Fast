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

// editabe profile
export const ADD_NEW_PROCESS = 'ADD_NEW_PROCESS';
export const DELTE_PROCESS_BY_ID = 'DELTE_PROCESS_BY_ID';
export const SET_EDITABLE_PROFILE = 'SET_EDITABLE_PROFILE';
export const SET_EDITABLE_ROW_ID = 'SET_EDITABLE_ROW_ID';
export const SET_EDITABLE_COMMENT = 'SET_EDITABLE_COMMENT';
export const RESET_EDITABLE_ROW_ID = 'RESET_EDITABLE_ROW_ID';
export const CHANGE_TABLE_CELL = 'CHANGE_TABLE_CELL';
export const CHANGE_TABLE_COMMENT = 'CHANGE_TABLE_COMMENT';


export const getProfiles = () => (dispatch) => {
    dispatch({ type: PROFILE_REQUEST });
    request('dd104', 'fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: PROFILE_REQUEST_SUCCESS, payload: res.result })
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

export const changeProfile = (profileName) => (dispatch) => {
    dispatch({type: CHANGE_PROFILE, payload: profileName});
    request('dd104','profile_apply', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: CHANGE_PROFILE_SUCCESS})
            dispatch(getActiveTable());

        })
        .catch(error => {
            dispatch({type: CHANGE_PROFILE_FAILED})
        })
}

export const getTableByProfileName = (profileName) => (dispatch) => {
    dispatch({type: GET_TABLE_BY_PROFILE_NAME});
    request('dd104', 'fetch_ld', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_TABLE_BY_PROFILE_NAME_SUCCESS,
                payload: res.result.data.map((record, index) => {
                    return {
                        ...record,
                        id: index
                    }
                })
            })
        })
        .catch(error => {
            dispatch(dispatch({type: GET_TABLE_BY_PROFILE_NAME_FAILED}))
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

export const profileSave = (name, data) => (dispatch) => {
    dispatch({type: SAVE_PROFILE})
    request('dd104', 'profile_save', {
        name,
        data
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: SAVE_PROFILE_SUCCESS})
        })
        .catch(error => {
            dispatch({type: SAVE_PROFILE_FAILED})
        })
}



