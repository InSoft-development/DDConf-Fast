import { 
    GET_PROFILES_REQUEST,
    GET_PROFILES_REQUEST_SUCCESS,
    GET_PROFILES_REQUEST_FAILED,

    GET_TABLE_BY_PROFILE_NAME,
    GET_TABLE_BY_PROFILE_NAME_SUCCESS,
    GET_TABLE_BY_PROFILE_NAME_FAILED,

    CHANGE_PROFILE,

    SAVE_PROFILE,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILED,

    APPLY_PROFILE,
    APPLY_PROFILE_SUCCESS,
    APPLY_PROFILE_FAILED,

    DELETE_PROFILE,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILED,

    SET_DEFAULT_SLICE_STATE

} from '../actions/profile-editor';

const initialState = {
    selectedProfile: '',
    availableProfiles: [],

    table: [],

    activeProfileRequest: false,
    activeProfileRequestSuccess: false,
    activeProfileRequestFailed: false,

    tableRequest: false,
    tableRequestSuccess: false,
    tableRequestFailed: false,

    profileSaveRequest: false,
    profileSaveRequestSuccess: false,
    profileSaveRequestFailed: false,

    applyProficeRequest: false,
    applyProficeRequestSuccess: false,
    applyProficeRequestFailed: false,

    deleteProfileRequest: false,
    deleteProfileRequestSuccess: false,
    deleteProfileRequestFailed: false,
}

export const profileEditorReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROFILES_REQUEST: {
            return {
                ...state,
                activeProfileRequest: true,
                activeProfileRequestSuccess: false,
                activeProfileRequestFailed: false,
            }
        }
        case GET_PROFILES_REQUEST_SUCCESS: {
            return {
                ...state,
                activeProfileRequest: false,
                activeProfileRequestSuccess: true,
                activeProfileRequestFailed: false,
                
                selectedProfile: action.payload.active,
                availableProfiles: action.payload.loadout_names,
            }
        }
        case GET_PROFILES_REQUEST_FAILED: {
            return {
                ...state,
                activeProfileRequest: false,
                activeProfileRequestSuccess: false,
                activeProfileRequestFailed: true,
            }
        }
        case GET_TABLE_BY_PROFILE_NAME: {
            return {
                ...state,
                tableRequest: true,
                tableRequestSuccess: false,
                tableRequestFailed: false,
            }
        }
        case GET_TABLE_BY_PROFILE_NAME_SUCCESS: {
            return {
                ...state,
                tableRequest: false,
                tableRequestSuccess: true,
                tableRequestFailed: false,

                table: action.payload
            }
        }
        case GET_TABLE_BY_PROFILE_NAME_FAILED: {
            return {
                ...state,
                tableRequest: false,
                tableRequestSuccess: false,
                tableRequestFailed: true,
            }
        }
        case CHANGE_PROFILE: {
            return {
                ...state,
                selectedProfile: action.payload
            }
        }
        case SAVE_PROFILE:{
            return {
                ...state,
                profileSaveRequest: true,
                profileSaveRequestSuccess: false,
                profileSaveRequestFailed: false
            }
        }
        case SAVE_PROFILE_SUCCESS:{
            return {
                ...state,
                profileSaveRequest: false,
                profileSaveRequestSuccess: true,
                profileSaveRequestFailed: false
            }
        }
        case SAVE_PROFILE_FAILED:{
            return {
                ...state,
                profileSaveRequest: false,
                profileSaveRequestSuccess: false,
                profileSaveRequestFailed: true
            }
        }
        case APPLY_PROFILE: {
            return {
                ...state,
                applyProficeRequest: true,
                applyProficeRequestSuccess: false,
                applyProficeRequestFailed: false,
            }
        }
        case APPLY_PROFILE_SUCCESS: {
            return {
                ...state,
                applyProficeRequest: false,
                applyProficeRequestSuccess: true,
                applyProficeRequestFailed: false,
            }
        }
        case APPLY_PROFILE_FAILED: {
            return {
                ...state,
                applyProficeRequest: false,
                applyProficeRequestSuccess: false,
                applyProficeRequestFailed: true,
            }
        }
        case DELETE_PROFILE: {
            return {
                ...state,
                deleteProfileRequest: true,
                deleteProfileRequestSuccess: false,
                deleteProfileRequestFailed: false,
            }
        }
        case DELETE_PROFILE_SUCCESS: {
            return {
                ...state,
                deleteProfileRequest: false,
                deleteProfileRequestSuccess: true,
                deleteProfileRequestFailed: false,
            }
        }
        case DELETE_PROFILE_FAILED: {
            return {
                ...state,
                deleteProfileRequest: false,
                deleteProfileRequestSuccess: false,
                deleteProfileRequestFailed: true,
            }
        }
        case SET_DEFAULT_SLICE_STATE:{
            return {
                ...initialState
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}