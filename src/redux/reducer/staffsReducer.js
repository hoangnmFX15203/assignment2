import { STAFFS, DEPARTMENTS } from '~/assets/data/staffs';
import { useState } from 'react';

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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const staffsReducer = createSlice({
    name: 'staffList',
    initialState: { status: 'idle', staffList: [], department: [], salary: [] },
    reducers: {
        addNewStaff: (state, action) => {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        },
        editStaff: (state, action) => {
            let newList = [...state];
            let newStaff = newList.find(
                (staff) => staff.id === action.payload.id,
            );
            newStaff = {
                id: newStaff.id,
                name: action.payload.name,
                doB: action.payload.doB,
                salaryScale: action.payload.salaryScale,
                startDate: action.payload.startDate,
                department: action.payload.department,
                annualLeave: action.payload.annualLeave,
                overTime: action.payload.overTime,
                image: '/assets/images/avarta.png',
            };
            newList = newList.map((staff) => {
                if (staff.id === newStaff.id) {
                    return {
                        ...staff,
                        name: action.payload.name,
                        doB: action.payload.doB,
                        salaryScale: action.payload.salaryScale,
                        startDate: action.payload.startDate,
                        department: action.payload.department,
                        annualLeave: action.payload.annualLeave,
                        overTime: action.payload.overTime,
                    };
                }
                return staff;
            });
            return newList;
        },
        deleteStaff: (state, action) => {
            const newList = [...state];
            const staff = newList.findIndex((staff) => {
                return staff.id === action.payload;
            });
            newList.splice(staff, 1);
            return newList;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.staffList = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchDepartment.fulfilled, (state, action) => {
                state.department = action.payload;
            })
            .addCase(fetchSalary.fulfilled, (state, action) => {
                state.salary = action.payload;
            })
            .addCase(addNewStaff.fulfilled, (state, action) => {
                console.log('addStaff', action.payload);
                const newStaffList = state.staffList;
                state.staffList = action.payload;
                return newStaffList;
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                console.log('updateStaff', action.payload);

                const staffIndex = state.staffList.findIndex(
                    (x) => x.id === action.payload.id,
                );
                state.staffList = action.payload;
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                console.log(action);
                // const newList = state.staffList.filter(
                //     (staff) => staff.id !== action.payload,
                // );
                const newList = state.staffList;
                state.staffList = action.payload;
                return newList;
            });
    },
});

export const fetchStaff = createAsyncThunk('staffs/fetchStaffs', async () => {
    const res = await fetch('https://rjs101xbackend.herokuapp.com/staffs');
    const data = await res.json();
    return data;
});

export const fetchDepartment = createAsyncThunk(
    'staffs/department',
    async () => {
        const res = await fetch(
            'https://rjs101xbackend.herokuapp.com/departments',
        );
        const data = await res.json();
        return data;
    },
);

export const fetchSalary = createAsyncThunk('staffs/Salary', async () => {
    const res = await fetch(
        'https://rjs101xbackend.herokuapp.com/staffsSalary',
    );
    const data = await res.json();
    return data;
});

export const addNewStaff = createAsyncThunk(
    'staffs/addNewStaff',
    async (newStaff) => {
        const res = await fetch('https://rjs101xbackend.herokuapp.com/staffs', {
            method: 'POST',
            body: JSON.stringify(newStaff),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const addData = await res.json();
        return addData;
    },
);

export const updateStaff = createAsyncThunk(
    'staffs/updateStaff',
    async (staff) => {
        console.log(staff);
        const res = await fetch(`https://rjs101xbackend.herokuapp.com/staffs`, {
            method: 'PATCH',
            body: JSON.stringify(staff),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    },
);

export const deleteStaff = createAsyncThunk('staff/deleteStaff', async (id) => {
    const res = await fetch(
        `https://rjs101xbackend.herokuapp.com/staffs/${id}`,
        {
            method: 'DELETE',
            body: JSON.stringify(id),
        },
    );
    const data = await res.json();
    return data;
});

export default staffsReducer;

// export function addStaff(staff) {
//     return function addStaffThunk(dispatch, getState) {
//         dispatch(staffsReducer.actions.addNewStaff(staff));
//         console.log(getState());
//     };
// }
