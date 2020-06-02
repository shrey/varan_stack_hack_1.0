import {EventActionTypes} from './single-event.types'
const INITIAL_STATE = {
        name: '',
        isLoading: false
}
const eventReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EventActionTypes.SET_NAME:
            return{
                ...state,
                name: action.payload
            }
        case EventActionTypes.TURN_LOADING_ON:
            return{
                ...state,
                isLoading: true
            }
        case EventActionTypes.TURN_LOADING_OFF:
            return{
                ...state,
                isLoading: false
            }
            default:
                return state;
    }
}

export default eventReducer;
