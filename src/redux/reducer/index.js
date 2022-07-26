import staffsReducer from '~/redux/reducer/staffsReducer';
import searchReducer from '~/redux/reducer/searchReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    staffList: staffsReducer,
    search: searchReducer,
});

export default rootReducer;
