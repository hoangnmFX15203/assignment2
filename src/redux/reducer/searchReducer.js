import { createSlice } from '@reduxjs/toolkit';

const initial = {
    search: '',
};

const searchReducer = (state = initial, action) => {
    switch (action.type) {
        case 'search/searchFilter': {
            return {
                ...state,
                search: action.payload,
            };
        }

        default:
            return state;
    }
};

export default searchReducer;

// export const searchReducer = createSlice({
//     name: 'search',
//     initialState: {
//         search: '',
//     },
//     reducers: {
//         searchFilter: (state, action) => {
//             state.search = action.payload;
//         },
//     },
// });
