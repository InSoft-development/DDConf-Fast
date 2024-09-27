import {
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_FAILED,

    GET_ACTIVE_TABLE,
    GET_ACTIVE_TABLE_SUCCESS,
    GET_ACTIVE_TABLE_FAILED,

    CHANGE_PROFILE,
    CHANGE_PROFILE_SUCCESS,
    CHANGE_PROFILE_FAILED,

    CHANGE_PROCESS_STATUS,
    CHANGE_PROCESS_STATUS_SUCCESS,
    CHANGE_PROCESS_STATUS_FAILED,
    
    SET_DEFAULT_SLICE_STATE
} from '../actions/profile';

const initialState = {
    activeProfile: null,
    activeTable: [],
    availableProfiles: [],

    profileRequest: false,
    profileSuccess: false,
    profileFailed: false,

    activeTableRequest: false,
    activeTableRequestSuccess: false,
    activeTableRequestFailed: false,
    
    changeProfileRequest: false,
    changeProfileSuccess: false,
    changeProfileFailed: false,

}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_REQUEST: {
            return {
                ...state,
                profileRequest: true,
                profileSuccess: false,
                profileFailed: false,

            }
        }
        case PROFILE_REQUEST_SUCCESS: {
            return {
                ...state,
                profileRequest: false,
                profileSuccess: true,
                profileFailed: false,

                activeProfile: action.payload.active,
                availableProfiles: action.payload.loadout_names,
            }
        }
        case PROFILE_REQUEST_FAILED: {
            return {
                ...state,
                profileRequest: false,
                profileSuccess: false,
                profileFailed: true,
            }
        }
        case GET_ACTIVE_TABLE: {
            return {
                ...state,
                activeTableRequest: true,
                activeTableRequestSuccess: false,
                activeTableRequestFailed: false,
            }
        }
        case GET_ACTIVE_TABLE_SUCCESS: {
            return {
                ...state,
                activeTableRequest: false,
                activeTableRequestSuccess: true,
                activeTableRequestFailed: false,
                activeTable: action.payload.map((record, index) => {
                    return {
                        ...record,
                        id: index
                    }
                })
            }
        }
        case GET_ACTIVE_TABLE_FAILED: {
            return {
                ...state,
                activeTableRequest: false,
                activeTableRequestSuccess: false,
                activeTableRequestFailed: true,
            }
        }
        case CHANGE_PROFILE: {
            return {
                ...state,
                changeProfileRequest: true,
                changeProfileSuccess: false,
                changeProfileFailed: false,
                nextProfile: action.payload
            }
        }
        case CHANGE_PROFILE_SUCCESS: {
            return {
                ...state,
                changeProfileRequest: false,
                changeProfileSuccess: true,
                changeProfileFailed: false,
                activeProfile: state.nextProfile,
                nextProfile: null,
            }
        }
        case CHANGE_PROFILE_FAILED: {
            return {
                ...state,
                changeProfileRequest: false,
                changeProfileSuccess: false,
                changeProfileFailed: true,
                nextProfile: null,
            }
        }
        case CHANGE_PROCESS_STATUS: {
            const processId = action.payload;

            if (Array.isArray(processId)) {
                const changedProcesses = state.activeTable.map(process => {
                    return {
                        ...process,
                        status: 'loading'
                    }

                });

                return {
                    ...state,
                    activeTable: changedProcesses,
                }

            } else {
                const changedProcesses = state.activeTable.map(process => {
                    if (process.id === processId) {
                        return {
                            ...process,
                            status: 'loading'
                        }
                    }
                    return process;
                });

                return {
                    ...state,
                    activeTable: changedProcesses,
                }
            }



        }
        case CHANGE_PROCESS_STATUS_SUCCESS: {
            if (Array.isArray(action.payload)) {

                const newProcesses = [];
                state.activeTable.forEach((process) => {

                    let isProcessConsist = false;

                    for (let changedProcess of action.payload) {
                        if (process.id === changedProcess.pid) {
                            isProcessConsist = true;
                            newProcesses.push({
                                ...process,
                                status: changedProcess.status,
                            })
                            break;
                        }
                    }

                    if (!isProcessConsist) {
                        newProcesses.push(process)
                    }

                })

                return {
                    ...state,
                    activeTable: newProcesses

                }

            } else {
                const { pid, status } = action.payload;

                const changedProcesses = state.activeTable.map((process) => {
                    if (process.id === pid) {
                        return {
                            ...process,
                            status,
                        }
                    }
                    return process;
                })

                return {
                    ...state,
                    activeTable: changedProcesses
                }
            }

        }
        case CHANGE_PROCESS_STATUS_FAILED: {
            return {
                ...state,
            }
        }
        case SET_DEFAULT_SLICE_STATE: {
            
            return {
                ...initialState
            }
        }
        default: {
            return state;
        }
    }
}