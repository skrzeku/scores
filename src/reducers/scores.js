

export const scores = (state = [], action) => {
    switch (action.type) {
        case 'SCORES_FETCHED':
            return [
                ...action.scores
            ];
        default: return state;
    }
};