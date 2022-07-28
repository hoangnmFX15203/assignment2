import { createSelector } from '@reduxjs/toolkit';

export const staffListSelector = (state) => {
    return state.staffList;
};

// export const staffListSelector = (state) => {
//     const staffListRemain = state.staffList.staffList.filter((staff) => {
//         return staff.name.includes(state.search);
//     });
//     return staffListRemain;
// };
export const searchListSelector = (state) => {
    return state.search;
};
export const staffListRemain = createSelector(
    staffListSelector,
    searchListSelector,
    (staffList, searchList) => {
        console.log(staffList);
        return staffList.filter((staff) => {
            return staff.name.includes(searchList.search);
        });
    },
);
