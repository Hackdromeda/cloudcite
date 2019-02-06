export const UPDATE_CREATORS_MAP = (creatorsMap) => dispatch => {
    dispatch({
       type: 'UPDATE_CREATORS_MAP',
       payload: creatorsMap
    });
}