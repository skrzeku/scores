export const minuses = (state = [], action) => {
    switch (action.type) {
        case 'MINUSES_FETCHED':
            return [
                ...action.minuses
            ];
        case 'ADD_MINUSES':
            return [
                ...action.minuses, action.minuse
            ];
        default: return state;
    }
};