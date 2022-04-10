import axios from "axios";

export const getRequest = async (url, token) => {
    const res = await axios.get(`https://guess-what-mini-game-app.herokuapp.com/api/${url}`, {
        headers: {
            "Authorization": `Bearer: ${token}`
        }
    });

    return res;
}

export const postRequest = async (url, data, token) => {
    const res = await axios.post(`https://guess-what-mini-game-app.herokuapp.com/api/${url}`, data, {
        headers: {
            "Authorization": `Bearer: ${token}`
        }
    });

    return res;
}

export const putRequest = async (url, data, token) => {
    const res = await axios.put(`https://guess-what-mini-game-app.herokuapp.com/api/${url}`, data, {
        headers: {
            "Authorization": `Bearer: ${token}`
        }
    });

    return res;
}

export const deleteRequest = async (url, token) => {
    const res = await axios.delete(`https://guess-what-mini-game-app.herokuapp.com/api/${url}`, {
        headers: {
            "Authorization": `Bearer: ${token}`
        }
    });

    return res;
}