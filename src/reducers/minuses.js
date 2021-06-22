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
        case 'REMOVE_MINUS':
            action.minuses.splice(action.index, 1);
            return [
                ...action.minuses
            ];
        default: return state;
    }
};