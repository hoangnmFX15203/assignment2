import { STAFFS } from '~/assets/data/staffs';

// const initial = {
//     staffList: STAFFS,
// };

// const staffsReducer = (state = initial, action) => {
//     switch (action.type) {
//         case 'staffList/addStaff': {
//             const newList = [...state.staffList];
//             newList.push(action.payload);

//             return {
//                 ...state,
//                 staffList: newList,
//             };
//         }

//         case 'staffList/editStaff': {
//             break;
//         }

//         case 'staffList/deleteStaff': {
//             break;
//         }

//         default:
//             return state;
//     }
// };

// export default staffsReducer;

import { createSlice, current } from '@reduxjs/toolkit';

const staffsReducer = createSlice({
    name: 'staffList',
    initialState: STAFFS,
    reducers: {
        addNewStaff: (state, action) => {
            console.log(state);
            const newList = [...state];

            console.log(newList);
            newList.push(action.payload);
            return newList;
        },
        editStaff: (state, action) => {
            console.log(state);
            console.log(action);
            const newList = [...state];
            console.log(current(newList));
            const staff = newList.find(
                (state) => state.id === action.payload.id,
            );
            console.log(staff);
            return staff;
        },
    },
});

export default staffsReducer;
