export const ADD_FAVORITE_STYLE = (style) => dispatch => {
    dispatch({
       type: 'ADD_FAVORITE_STYLE',
       payload: style
    });
}

export const REMOVE_FAVORITE_STYLE = (style) => dispatch => {
    dispatch({
       type: 'REMOVE_FAVORITE_STYLE',
       payload: style
    });
}