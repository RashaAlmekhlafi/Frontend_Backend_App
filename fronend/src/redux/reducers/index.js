import {combineReducers} from 'redux'
import Authreducer from './authreducer'

const reducers= combineReducers({
    auth:Authreducer,
})
export default reducers