import {EventActionTypes} from './single-event.types'
export const setName = (name) => ({
    type: EventActionTypes.SET_NAME,
    payload: name
})