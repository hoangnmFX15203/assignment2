import { STAFFS } from '~/assets/data/staffs';

const initial = {
    staffList: STAFFS,
};

const staffsReducer = (state = initial, action) => {
    switch (action.type) {
        case 'staffList/addStaff': {
            const newList = [...state.staffList];
            newList.push(action.payload);

            return {
                ...state,
                staffList: newList,
            };
        }

        case 'staffList/editStaff': {
            break;
        }

        case 'staffList/deleteStaff': {
            break;
        }

        default:
            return state;
    }
};

export default staffsReducer;

// import { createSlice } from '@reduxjs/toolkit';

// export const staffsReducer = createSlice({
//     name: 'handleStaffs',
//     initialState: STAFFS,
//     reducers: {
//         addNewStaff: (state, action) => {
//             state.list.push(action.payload);
//         },
//     },
// });
