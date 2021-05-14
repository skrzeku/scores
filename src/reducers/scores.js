export const scores = (state = [], action) => {
    switch (action.type) {
        case 'SCORES_FETCHED':
            return [
                ...action.scores
            ];
        case 'FILTER_SCORES':
            return [

            ];
        default: return state;
    }
};