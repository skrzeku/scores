export const notes = (state = [], action) => {
    switch (action.type) {
        case 'NOTES_FETCHED':
            return [
                ...action.notes
            ];
        case 'ADD_NOTE':
            return [
                ...action.notes, action.note
            ];

        default: return state;
    }
};