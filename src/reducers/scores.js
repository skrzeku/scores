

export const scores = (state = [], action) => {
    switch (action.type) {
        case 'SCORES_FETCHED':
            return [
                ...action.scores
            ];
        case 'ADD_SCORE':
            return [
                ...action.scores, action.score
            ];
        default: return state;
    }
};