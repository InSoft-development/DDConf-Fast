import {
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_FAILED,

    GET_PROCESSES,
    GET_PROCESSES_SUCCESS,
    GET_PROCESSES_FAILED,

    CHANGE_PROFILE,
    CHANGE_PROFILE_SUCCESS,
    CHANGE_PROFILE_FAILED,

    CHANGE_PROCESS_STATUS,
    CHANGE_PROCESS_STATUS_SUCCESS,
    CHANGE_PROCESS_STATUS_FAILED

} from '../actions/profile';

const initialState = {
    activeProfile: undefined,
    processes: [],
    availableProfiles: [],

    profileRequest: false,
    profileSuccess: false,
    profileFailed: false,

    processRequest: false,
    processRequestSuccess: false,
    processRequestFailed: false,

    // active profile changing not inner data
    nextProfile: null,
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
        case GET_PROCESSES: {
            return {
                ...state,
                processRequest: true,
                processRequestSuccess: false,
                processRequestFailed: false,
            }
        }
        case GET_PROCESSES_SUCCESS: {
            return {
                ...state,
                processRequest: false,
                processRequestSuccess: true,
                processRequestFailed: false,
                processes: action.payload
            }
        }
        case GET_PROCESSES_FAILED: {
            return {
                ...state,
                processRequest: false,
                processRequestSuccess: false,
                processRequestFailed: true,
            }
        }
        case CHANGE_PROCESS_STATUS: {
            const processId = action.payload;

            if (Array.isArray(processId)) {
                const changedProcesses = state.processes.map(process => {
                    return {
                        ...process,
                        status: 'loading'
                    }

                });

                return {
                    ...state,
                    processes: changedProcesses,
                }

            } else {
                const changedProcesses = state.processes.map(process => {
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
                    processes: changedProcesses,

                }
            }



        }
        case CHANGE_PROCESS_STATUS_SUCCESS: {
            if (Array.isArray(action.payload)) {

                const newProcesses = [];
                state.processes.forEach((process) => {

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
                    processes: newProcesses

                }

            } else {
                const { pid, status } = action.payload;

                const changedProcesses = state.processes.map((process) => {
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
                    processes: changedProcesses
                }
            }

        }
        case CHANGE_PROCESS_STATUS_FAILED: {
            return {
                ...state,
            }
        }
        default: {
            return state;
        }
    }
}