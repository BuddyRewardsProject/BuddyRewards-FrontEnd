import { combineReducers } from 'redux';
import pinAuth from './reducers/pinAuth';
import auth from './reducers/auth';
import customerAuth from './reducers/customerAuth';

export default combineReducers({
    auth,
    pinAuth,
    customerAuth
})