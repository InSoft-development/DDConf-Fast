import { SET_FORM_NETWORK } from "../actions/network";

const initialStateNetwork = {
    form:{},
}
export const formReduserNetwork = (state = initialStateNetwork, action) =>{
    switch(action.type){
        case SET_FORM_NETWORK:{
            return{
                ...state,
                NewForm: action.payload
            }
        }
        default:{
            return state;
        }
    }
}