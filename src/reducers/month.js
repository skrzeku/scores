// const initioalmonth = new Date().getMonth();

export const month = (state = 2, action) => {
    switch (action.type) {
        case 'CHANGE_MONTH':
            console.log(action.month);
            return action.month;

        default: return state;
    }
};