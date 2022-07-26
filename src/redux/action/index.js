export const addNewStaff = (staff) => {
    return {
        type: 'staffList/addStaff',
        payload: staff,
    };
};

export const editStaff = (staff) => {
    return {
        type: 'staffList/editStaff',
        payload: staff,
    };
};

export const deleteStaff = (staff) => {
    return {
        type: 'staffList/deleteStaff',
        payload: staff,
    };
};

export const searchFilter = (text) => {
    return {
        type: 'search/searchFilter',
        payload: text,
    };
};
