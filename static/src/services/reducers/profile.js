import { PROFILE_REQUEST,
         PROFILE_REQUEST_SUCCESS,
         PROFILE_REQUEST_FAILED 
} from '../actions/profile';

const initialState = {
    currentProfile: undefined,
    processes: [],
    availableProfiles: [],
    
    profileRequest: false,
    profileSuccess: false,
    profileFailed: false,

}

export const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case PROFILE_REQUEST:{
            return {
                ...state,
                profileRequest: true,
                profileSuccess: false,
                profileFailed: false,

            }
        }
        case PROFILE_REQUEST_SUCCESS:{

            const {active, loadout_names} = action.payload;
            
            return {
                ...state,
                profileRequest: false,
                profileSuccess: true,
                profileFailed: false,
                currentProfile: active.name,
                processes: active.proc_data,
                availableProfiles: loadout_names,
            }
        }
        case PROFILE_REQUEST_FAILED:{
            return {
                ...state,
                profileRequest: false,
                profileSuccess: false,
                profileFailed: true,
            }
        }
        default:{
            return state;
        }
    }
}