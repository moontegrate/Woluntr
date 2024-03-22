import { postRequest } from "./http";

const getTokens = async () => {
    localStorage.removeItem("access_token");

    const response = await postRequest('http://localhost:8000/auth/jwt/refresh/', {
        refresh: localStorage.getItem('refresh_token')
    }, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    });

    const { access } = response;

    localStorage.setItem("access_token", access);

    return access;
};

export default getTokens;