export const addNewStaff = (staff) => {
    return {
        type: 'ADD_STAFF',
        payload: staff,
    };
};

export const editStaff = (staff) => {
    return {
        type: 'EDIT_STAFF',
        payload: staff,
    };
};

export const deleteStaff = (staff) => {
    return {
        type: 'DELETE_STAFF',
        payload: staff,
    };
};
