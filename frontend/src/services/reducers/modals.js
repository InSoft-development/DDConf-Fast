import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    OPEN_COMMENT_EDITOR,
    CLOSE_COMMENT_EDITOR
} from '../actions/modals';

const initialState = {
    sidebarIsOpen: false,
    commentEditorIsOpen: false,

}

export const modalsReducer = (state = initialState, action) => {
    switch(action.type){
        case OPEN_SIDEBAR:{
            return {
                ...state,
                sidebarIsOpen: true,
            }
        }
        case CLOSE_SIDEBAR: {
            return {
                ...state,
                sidebarIsOpen: false,
            }
        }
        case OPEN_COMMENT_EDITOR: {
            return {
                ...state,
                commentEditorIsOpen: true,
            }
        }
        case CLOSE_COMMENT_EDITOR: {
            return {
                ...state,
                commentEditorIsOpen: false,
            }
        }
        default: {
            return state;
        }
    }
}