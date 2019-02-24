import uniq from 'lodash.uniq';

const initialState = {
    creatorsTypes: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CREATORS_TYPES':
        return { ...state, creatorsTypes: uniq(state.creatorsTypes.concat(action.payload))};
    default:
        return state
    }
}