const initioalmonth = new Date().getMonth();

export const month = (state = initioalmonth, action) => {
    switch (action.type) {
        case 'CHANGE_MONTH':
            return action.month;

        default: return state;
    }
};