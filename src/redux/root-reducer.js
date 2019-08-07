import { combineReducers } from 'redux';

import userReducer from './user/user.reduces';

export default combineReducers({
    user: userReducer
});