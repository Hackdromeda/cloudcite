const initialState = {
    favoriteStyles: [
        {"key":"modern-language-association","value":"Modern Language Association 8th edition (MLA)"},
        {"key": "apa","value": "American Psychological Association 6th edition (APA)"},
        {"key":"chicago-note-bibliography","value":"Chicago Manual of Style 17th edition (note)"},
        {"key":"turabian-fullnote-bibliography","value":"Turabian 8th edition (full note)"},
        {"key":"ieee","value":"IEEE"},
        {"key":"elsevier-harvard","value":"Elsevier - Harvard (with titles)"},
        {"key":"american-medical-association","value":"American Medical Association (AMA)"},
        {"key":"american-sociological-association","value":"American Sociological Association (ASA)"},
        {"key":"vancouver","value":"Vancouver"}
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE_STYLE':
            return { ...state, favoriteStyles: state.favoriteStyles.filter(style => style.key !== action.payload.key).concat([action.payload])};
        case 'REMOVE_FAVORITE_STYLE':
            return { ...state, favoriteStyles: state.favoriteStyles.filter(style => style.key !== action.payload.key)};
    default:
        return state
    }
}