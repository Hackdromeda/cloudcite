export const SET_LOCALE = (locale) => dispatch => {
    dispatch({
       type: 'SET_LOCALE',
       payload: locale
    });
}