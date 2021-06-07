export const user = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return action.user;


        default: return state;
    }
};