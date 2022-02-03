export const clients = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CLIENTS_SUCCESS':
            return [
                ...action.clients
            ];
        default:
            return state
    }
};