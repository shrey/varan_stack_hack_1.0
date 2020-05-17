import {AdminActionTypes} from './admin.types'

const INITIAL_STATE = {
    isAdmin: false
    
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case AdminActionTypes.SET_ADMIN: 
        return{
            ...state,
            isAdmin: action.payload
        }
        case AdminActionTypes.REMOVE_ADMIN:
            return{
                ...state,
                isAdmin: false
            }
        default: 
        return state
    }
}
export default adminReducer;