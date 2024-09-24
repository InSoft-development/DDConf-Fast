import { request } from '../api';
import { checkResponce } from '../../utils/checkResponce';
import { notification } from 'antd';

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


export const getProfiles = () => (dispatch) => {
    dispatch({ type: GET_PROFILES_REQUEST });
    request('dd104', 'fetch_initial')
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({ type: GET_PROFILES_REQUEST_SUCCESS, payload: res.result })

            
        })
        .catch(error => {
            dispatch({ type: GET_PROFILES_REQUEST_FAILED })
        })
}

export const getTableByProfileName = (profileName) => (dispatch) => {
    dispatch({ type: GET_TABLE_BY_PROFILE_NAME });
    request('dd104', 'fetch_ld', {
        name: profileName
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
        })
        .catch(error => {
            dispatch({ type: GET_TABLE_BY_PROFILE_NAME_FAILED })
        })
}

export const changeProfile = (profileName) => (dispatch)=> {
    dispatch({type:CHANGE_PROFILE, payload: profileName})
    dispatch(getTableByProfileName(profileName));
}

export const saveProfile = (profileData) => (dispatch) => {
    dispatch({type: SAVE_PROFILE});

    request('dd104', 'profile_save', profileData)
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: SAVE_PROFILE_SUCCESS})

            if(res.error !== null){
                notification.error({
                    message: 'Ошибка запроса',
                    description: res.error ,
                    placement: 'topLeft',
                })
            }else{
                notification.success({
                    message: `Профиль ${profileData.name} успешно сохранён`,
                    placement: 'topLeft',
                })
            }
        })
        .catch(error => {
            dispatch({type: SAVE_PROFILE_FAILED})
        })
}

export const profileApply = (profileName) => (dispatch) => {
    dispatch({type: APPLY_PROFILE});
    request('dd104', 'profile_apply', {
        name: profileName
    })
        .then(res => checkResponce(res))
        .then(res => {
            dispatch({type: APPLY_PROFILE_SUCCESS})

            if(res.error !== null){
                notification.error({
                    message: 'Ошибка запроса',
                    description: res.error ,
                    placement: 'topLeft',
                })
            }else{
                notification.success({
                    message: `Профиль ${profileName} успешно установлен как активный`,
                    placement: 'topLeft',
                })
            }

        })
        .catch(error => dispatch({type: APPLY_PROFILE_FAILED}))
}