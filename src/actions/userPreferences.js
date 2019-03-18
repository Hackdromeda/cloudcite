export const TOGGLE_THEME = (isDarkTheme) => dispatch => {
    dispatch({
       type: 'TOGGLE_THEME',
       payload: isDarkTheme
    });
}