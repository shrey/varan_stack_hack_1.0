import {EventActionTypes} from './single-event.types'
const INITIAL_STATE = {
        name: ''
}
const eventReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EventActionTypes.SET_NAME:
            return{
                ...state,
                name: action.payload
            }
            default: 
                return state;
    }
}

export default eventReducer;
