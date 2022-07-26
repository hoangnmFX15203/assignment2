// import { createStore } from 'redux';
// import staffsReducer from '~/redux/reducer/staffsReducer';
// import searchReducer from '~/redux/reducer/searchReducer';
import rootReducer from '~/redux/reducer';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import { configureStore } from '@reduxjs/toolkit';

// const composeEnhancer = composeWithDevTools();

// const store = createStore(rootReducer, composeEnhancer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import staffsReducer from '~/redux/reducer/staffsReducer';
import searchReducer from '~/redux/reducer/searchReducer';

const store = configureStore({
    reducer: rootReducer,
});

export default store;
