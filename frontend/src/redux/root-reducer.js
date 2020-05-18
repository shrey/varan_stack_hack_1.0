import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import adminReducer from './admin/admin.reducer'
import eventReducer from './single-event/single-event.reducers'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['admin','event']
}
const rootReducer = combineReducers({
    admin: adminReducer,
    event: eventReducer
})

export default persistReducer(persistConfig,rootReducer);