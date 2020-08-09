import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';
import bookReducer from './bookReducer';

export const rootReducer = combineReducers({
    layout : layoutReducer,
    book : bookReducer,
});

export default rootReducer