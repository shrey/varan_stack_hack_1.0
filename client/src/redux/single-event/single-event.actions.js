import {EventActionTypes} from './single-event.types'
export const setName = (name) => ({
    type: EventActionTypes.SET_NAME,
    payload: name
})

export const turnLoadingOn = () => ({
    type: EventActionTypes.TURN_LOADING_ON
})

export const turnLoadingOff = () => ({
    type: EventActionTypes.TURN_LOADING_OFF
})