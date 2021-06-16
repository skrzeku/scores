

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
        case 'REMOVE_SCORE':
        action.scores.splice(action.index, 1);
            return [
                ...action.scores
            ];
        default: return state;
    }
};