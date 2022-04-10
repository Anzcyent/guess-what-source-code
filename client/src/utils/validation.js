export const validateLogin = ({ userName, password }) => {
    if (userName === "" || password === "") {
        return false;
    }

    return true;
}

export const validateRegister = ({ email, userName, password, confirmPassword }) => {
    const validateEmail = (email) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if (email === "" || userName === "" || password === "" || confirmPassword === "") {
        return false;
    }

    else if (password === "") {
        return false;
    }

    else if (confirmPassword === "") {
        return false;
    }

    else if (password !== confirmPassword) {
        return false;
    }

    else if (!validateEmail(email)) {
        return false;
    }

    return true;
}

export const validateResetPassword = ({ input, token, password, confirmPassword }) => {
    if (input === "") {
        return false;
    }

    if (token === "") {
        return false;
    }

    if (password === "") {
        return false;
    }

    if (confirmPassword === "") {
        return false;
    }

    if (password !== confirmPassword) {
        return false;
    }

    return true;
}