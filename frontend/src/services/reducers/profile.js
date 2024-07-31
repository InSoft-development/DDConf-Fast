import {
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_FAILED,

    GET_ACTIVE_TABLE,
    GET_ACTIVE_TABLE_SUCCESS,
    GET_ACTIVE_TABLE_FAILED,

    GET_TABLE_BY_PROFILE_NAME,
    GET_TABLE_BY_PROFILE_NAME_SUCCESS,
    GET_TABLE_BY_PROFILE_NAME_FAILED,

    CHANGE_PROFILE,
    CHANGE_PROFILE_SUCCESS,
    CHANGE_PROFILE_FAILED,

    CHANGE_PROCESS_STATUS,
    CHANGE_PROCESS_STATUS_SUCCESS,
    CHANGE_PROCESS_STATUS_FAILED,

    SAVE_PROFILE,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILED,
    
    ADD_NEW_PROCESS,
    SET_EDITABLE_ROW_ID,
    CHANGE_TABLE_CELL,
    SET_EDITABLE_PROFILE,
    DELTE_PROCESS_BY_ID,
    RESET_EDITABLE_ROW_ID,
    SET_EDITABLE_COMMENT,
    CHANGE_TABLE_COMMENT


} from '../actions/profile';

const initialState = {
    activeProfile: undefined,
    activeTable: [],
    availableProfiles: [],

    profileRequest: false,
    profileSuccess: false,
    profileFailed: false,

    activeTableRequest: false,
    activeTableRequestSuccess: false,
    activeTableRequestFailed: false,

    // active profile changing not inner data
    nextProfile: null,
    changeProfileRequest: false,
    changeProfileSuccess: false,
    changeProfileFailed: false,

    // editable page

    editableProfile: null,
    editableTable: [],
    editableRow: null,
    editableComment: '',

    editableTableRequest: false,
    editableTableRequestSuccess: false,
    editableTableRequestFailed: false,

    saveProfileRequest: false,
    saveProfileRequestSuccess: false,
    saveProfileRequestFailed: false,
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
        case ADD_NEW_PROCESS: {

            const newProcesses = [...state.editableTable];

            newProcesses.push({
                main: null,
                second: null,
                comment: null,
                id: newProcesses.length
            })

            return {
                ...state,
                editableTable: newProcesses
            }
        }
        case DELTE_PROCESS_BY_ID: {

            const newTable = [...state.editableTable].filter((_, id) => id !== action.payload)

            return {
                ...state,
                editableTable: newTable.map((record, id) => {
                    return {
                        ...record,
                        id
                    }
                })
            }
        }
        case SET_EDITABLE_ROW_ID: {

            const editableRow = action.payload.id;

            return {
                ...state,
                editableRow
            }
        }
        case CHANGE_TABLE_CELL: {
            const {field, value} = action.payload;
            const currentEditableRow = state.editableRow;

            const newProcesses = [...state.editableTable].map((process) => {
                if(process.id === currentEditableRow){
                    return {
                        ...process,
                        [field]: value,
                    }
                }else{
                    return process
                }
            })

            return {
                ...state,
                editableTable: newProcesses
            }
        }
        case GET_TABLE_BY_PROFILE_NAME: {
            return {
                ...state,
                editableTableRequest: true,
                editableTableRequestSuccess: false,
                editableTableRequestFailed: false,
            }
        }
        case GET_TABLE_BY_PROFILE_NAME_SUCCESS: {
            return {
                ...state,
                editableTableRequest: false,
                editableTableRequestSuccess: true,
                editableTableRequestFailed: false,
                editableTable: action.payload
            }
        }
        case GET_TABLE_BY_PROFILE_NAME_FAILED: {
            return {
                ...state,
                editableTableRequest: false,
                editableTableRequestSuccess: false,
                editableTableRequestFailed: true,
            }
        }
        case SET_EDITABLE_PROFILE: {
            return {
                ...state,
                editableProfile: action.payload,
            }
        }
        case RESET_EDITABLE_ROW_ID: {
            return {
                ...state,
                editableRow: null
            }
        }
        case SET_EDITABLE_COMMENT: {
            return {
                ...state,
                editableComment: action.payload,
            }
        }
        case CHANGE_TABLE_COMMENT: {
            return {
                ...state,
                editableTable: [...state.editableTable].map(record => {
                    if(record.id === state.editableRow){
                        return {
                            ...record,
                            comment: action.payload
                        }
                    }else{
                        return record
                    }
                })
            }
            
            
        } 
        case SAVE_PROFILE: {
            return {
                ...state,
            }
        }
        case SAVE_PROFILE_SUCCESS: {
            return {
                ...state,
            }
        }
        case SAVE_PROFILE_FAILED: {
            return {
                ...state,
            }
        }
        default: {
            return state;
        }
    }
}