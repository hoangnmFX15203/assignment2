import staffsReducer from './staffsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    handleStaffs: staffsReducer,
});

export default rootReducer;
