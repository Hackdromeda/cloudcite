const initialState = {
    creatorsMap: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CREATORS_MAP':
        let creatorsMapCSL = state.creatorsMap.map((creator) => creator.csl);
        let actionCreatorsMapCSL = action.payload.map((creator) => creator.csl);
        let newCreatorsMap = [];
        return { ...state, creatorsMap: newCreatorsMap};
    default:
        return state
    }
}