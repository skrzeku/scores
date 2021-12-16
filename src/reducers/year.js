const initialState = new Date().getFullYear().toString();

export const year = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_YEAR':
            return action.year;

        default: return state;
    }
};