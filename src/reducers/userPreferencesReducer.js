const initialState = {
    theme: {
        isDarkTheme: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
        return { ...state, isDarkTheme: action.payload};
    default:
        return state
    }
}