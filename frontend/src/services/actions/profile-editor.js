import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';
import { notification } from 'antd';
import {store} from '../store';

export const GET_PROFILES_REQUEST = 'profile-editor/GET_PROFILES_REQUEST';
export const GET_PROFILES_REQUEST_SUCCESS = 'profile-editor/GET_PROFILES_REQUEST_SUCCESS';
export const GET_PROFILES_REQUEST_FAILED = 'profile-editor/GET_PROFILES_REQUEST_FAILED';

export const GET_TABLE_BY_PROFILE_NAME = 'profile-editor/GET_TABLE_BY_PROFILE_NAME';
export const GET_TABLE_BY_PROFILE_NAME_SUCCESS = 'profile-editor/GET_TABLE_BY_PROFILE_NAME_SUCCESS';
export const GET_TABLE_BY_PROFILE_NAME_FAILED = 'profile-editor/GET_TABLE_BY_PROFILE_NAME_FAILED';

export const CHANGE_PROFILE = 'profile-editor/CHANGE_PROFILE';

export const SAVE_PROFILE = 'profile-editor/SAVE_PROFILE';
export const SAVE_PROFILE_SUCCESS = 'profile-editor/SAVE_PROFILE_SUCCESS';
export const SAVE_PROFILE_FAILED = 'profile-editor/SAVE_PROFILE_FAILED';

export const APPLY_PROFILE = 'profile-editor/APPLY_PROFILE';
export const APPLY_PROFILE_SUCCESS = 'profile-editor/APPLY_PROFILE_SUCCESS';
export const APPLY_PROFILE_FAILED = 'profile-editor/APPLY_PROFILE_FAILED';

export const DELETE_PROFILE = 'profile-editor/DELETE_PROFILE';
export const DELETE_PROFILE_SUCCESS = 'profile-editor/DELETE_PROFILE_SUCCESS';
export const DELETE_PROFILE_FAILED = 'profile-editor/DELETE_PROFILE_FAILED';

// side effect
export const SET_DEFAULT_SLICE_STATE = 'profile-editor/SET_DEFAULT_SLICE_STATE';
export const SET_NEW_SELECTED_PROFILE_VALUE = 'profile-editor/SET_NEW_SELECTED_PROFILE_VALUE';

/* payload 
        isActicve
        isNew
        current
        previous
*/
export const initialize = (option, cb = null) => (dispatch) => {
    dispatch({ type: GET_PROFILES_REQUEST });
    request('dd104', 'fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: GET_PROFILES_REQUEST_SUCCESS, payload: res.result })
            dispatch({type: SET_NEW_SELECTED_PROFILE_VALUE, payload: {
                ...option
            }})

            if(store.getState().profileEditor.selectedProfile !== null){
                dispatch(getTableByProfileName())
            }

        })
        .catch(error => {
            dispatch({ type: GET_PROFILES_REQUEST_FAILED })
        })
}

export const getProfiles = (cb = null) => (dispatch) => {
    dispatch({ type: GET_PROFILES_REQUEST });
    request('dd104', 'fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: GET_PROFILES_REQUEST_SUCCESS, payload: res.result })

            if(cb){
                cb()
            }
        })
        .catch(error => {
            dispatch({ type: GET_PROFILES_REQUEST_FAILED })
        })
}

export const getTableByProfileName = (cb = null) => (dispatch) => {
    dispatch({ type: GET_TABLE_BY_PROFILE_NAME });
    request('dd104', 'fetch_ld', {
        name: store.getState().profileEditor.selectedProfile
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({
                type: GET_TABLE_BY_PROFILE_NAME_SUCCESS,
                payload: res.result.map((record, index) => {
                    return {
                        ...record,
                        id: index
                    }
                })
            })

            if(cb){
                cb();
            }
        })
        .catch(error => {
            dispatch({ type: GET_TABLE_BY_PROFILE_NAME_FAILED })
        })
}

export const changeProfile = (profileName) => (dispatch)=> {
    dispatch({type:CHANGE_PROFILE, payload: profileName})
    dispatch(getTableByProfileName());
}

export const saveProfile = (profileData, cb = null) => (dispatch) => {
    dispatch({type: SAVE_PROFILE});

    // Удаление свойста id в каждом объекте массива
    const newProfileData = {
        name: profileData.name,
        data: [...profileData.data].map(obj => {
            const {id, ...withoutId} = obj;
            return withoutId
        })
    };

    request('dd104', 'profile_save', newProfileData)
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: SAVE_PROFILE_SUCCESS})

            notification.success({
                message: `Профиль "${newProfileData.name}" успешно сохранён `,
                placement: 'topLeft',
            })

            if(cb){
                cb();
            }

        })
        .catch(error => {
            dispatch({type: SAVE_PROFILE_FAILED})
        })
}

export const profileApply = (profileName, cb = null) => (dispatch) => {
    dispatch({type: APPLY_PROFILE});
    request('dd104', 'profile_apply', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: APPLY_PROFILE_SUCCESS})
        
            notification.success({
                message: `Профиль ${profileName} успешно установлен как активный`,
                placement: 'topLeft',
            })

            if(cb){
                cb();
            }
            

        })
        .catch(error => dispatch({type: APPLY_PROFILE_FAILED}))
}

export const deleteProfile = (profileName, cb= null) => (dispatch) => {
    dispatch({type: DELETE_PROFILE})
    request('dd104', 'delete_ld', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: DELETE_PROFILE_SUCCESS})

            notification.success({
                message: `Профиль ${profileName} успешно удалён`,
                placement: 'topLeft'
            })

            if(cb){
                cb();
            }

        })
        .catch(error => dispatch({type: DELETE_PROFILE_FAILED}))
}

// side effect
export const setNewProfileValue = () => (dispatch)  => {
    dispatch({type: SET_NEW_SELECTED_PROFILE_VALUE})
}