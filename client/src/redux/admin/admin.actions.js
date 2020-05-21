import {AdminActionTypes} from './admin.types'

export const setAdmin = () => ({
    type: AdminActionTypes.SET_ADMIN,
    payload: true
})

export const removeAdmin = () => ({
    type: AdminActionTypes.REMOVE_ADMIN,
    
})
