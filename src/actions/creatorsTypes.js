export const UPDATE_CREATORS_TYPES = (creatorsMap) => dispatch => {
    dispatch({
       type: 'UPDATE_CREATORS_TYPES',
       payload: creatorsMap
    });
}