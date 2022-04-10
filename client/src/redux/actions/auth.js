import { auth, alert } from "../constants";
import { getRequest, postRequest } from "../../utils/request";

export const register = (data) => async (dispatch) => {
    try {
        dispatch({ type: alert.ALERT, payload: { loading: true } });

        const res = await postRequest("auth/register", data);

        dispatch({ type: auth.AUTH, payload: res.data.user });

        localStorage.setItem("auth", res.data.token);
        if (!localStorage.getItem("isReadRules")) localStorage.setItem("isReadRules", "not-readed");

        window.location.reload();
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: alert.ALERT, payload: { loading: true } });

        const res = await postRequest("auth/login", data);

        dispatch({ type: auth.AUTH, payload: res.data.user });

        localStorage.setItem("auth", res.data.token);

        if (!localStorage.getItem("isReadRules")) localStorage.setItem("isReadRules", "not-readed");

        window.location.reload();
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}

export const refresh_token = (token) => async (dispatch) => {
    try {
        const res = await getRequest("auth/refresh_token", token);

        dispatch({ type: auth.AUTH, payload: res.data.user });

        localStorage.setItem("auth", res.data.token)
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}

export const logout = () => async (dispatch) => {
    try {
        // eslint-disable-next-line
        const res = await getRequest("auth/logout");

        localStorage.removeItem("auth");

        document.cookie = null;

        window.location.reload();
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}

export const forgot_password = (data, set_reset_password, set_forgot_password) => async (dispatch) => {
    try {
        dispatch({ type: alert.ALERT, payload: { loading: true } });

        const res = await postRequest("auth/forgot_password", data);

        set_reset_password(true);
        set_forgot_password(false);

        localStorage.setItem("reset_password_input", data.input);

        dispatch({ type: alert.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}

export const reset_password = (data, set_reset_password) => async (dispatch) => {
    try {
        dispatch({ type: alert.ALERT, payload: { loading: true } });

        const input = localStorage.getItem("reset_password_input");

        const res = await postRequest(`auth/reset_password?input=${input}`, data);

        set_reset_password(false);

        localStorage.removeItem("reset_password_input");

        dispatch({ type: alert.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}