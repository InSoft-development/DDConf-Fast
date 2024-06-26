import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';

// initial request dd104 (get active profile, list of profiles)
export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCESS = 'PROFILE_REQUEST_SUCCESS';
export const PROFILE_REQUEST_FAILED = 'PROFILE_REQUEST_FAILED';

// get proccess by profile name
export const GET_PROCESSES = "GET_PROCESSES";
export const GET_PROCESSES_SUCCESS = "GET_PROCESSES_SUCCESS";
export const GET_PROCESSES_FAILED = "GET_PROCESSES_FAILED";

// about active profile property not data
export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE_SUCCESS';
export const CHANGE_PROFILE_FAILED = 'CHANGE_PROFILE_FAILED';

export const CHANGE_PROCESS_STATUS = 'CHANGE_PROCCESS_STATUS';
export const CHANGE_PROCESS_STATUS_SUCCESS = 'CHANGE_PROCCESS_STATUS_SUCCESS';
export const CHANGE_PROCESS_STATUS_FAILED = 'CHANGE_PROCCESS_STATUS_FAILED';


export const getProfiles = () => (dispatch) => {
    dispatch({ type: PROFILE_REQUEST });
    request('fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: PROFILE_REQUEST_SUCCESS, payload: res.result })
            const profileName = res.result.active;
            if(profileName !== null){
                dispatch(getProcessesByProfile(profileName))
            }
        })
        .catch(error => {
            dispatch({ type: PROFILE_REQUEST_FAILED })
        })
}

export const getProcessesByProfile = (profileName) => (dispatch) => {
    dispatch({type: GET_PROCESSES});
    request('fetch_id', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            const {data} = res.result;
            dispatch({
                type: GET_PROCESSES_SUCCESS,
                 payload: data.map((procces, index) => {
                    return {
                        ...procces,
                        id: index
                    }
                 })
            })
        })
        .catch(error => {
            dispatch({type: GET_PROCESSES_FAILED})
        })
}

export const changeProfile = (profileName) => (dispatch) => {
    dispatch({type: CHANGE_PROFILE, payload: profileName});
    request('profile_apply', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: CHANGE_PROFILE_SUCCESS})
            dispatch(getProcessesByProfile(profileName))

        })
        .catch(error => {
            dispatch({type: CHANGE_PROFILE_FAILED})
        })
}


export const changeProсess = (actionIndex, processId) => (dispatch) => {
    dispatch({ type: CHANGE_PROCESS_STATUS, payload: processId })
    request('process_handle', {
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