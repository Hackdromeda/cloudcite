const initialState = {
    locale: "locales-en-US"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOCALE':
        return { ...state, locale: action.payload};
    default:
        return state
    }
}