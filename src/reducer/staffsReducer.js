import { STAFFS } from '~/assets/data/staffs';

const initial = {
    list: STAFFS,
};

const staffsReducer = (state = initial, action) => {
    switch (action.type) {
        case 'ADD_STAFF': {
            const newList = [...state.list];
            newList.push(action.payload);

            return {
                ...state,
                list: newList,
            };
        }

        case 'EDIT_STAFF': {
            break;
        }

        case 'DELETE_STAFF': {
            break;
        }

        default:
            return state;
    }
};

export default staffsReducer;
