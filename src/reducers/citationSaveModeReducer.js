const initialState = {
    citationSaveMode: "ADD"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CITATION_SAVE_MODE':
        return { ...state, citationSaveMode: action.payload};
    default:
        return state
    }
}