import { alert } from "../constants"

export const alertNotification = (toast) => (dispatch) => {
    dispatch({ type: alert.ALERT, payload: toast });
}