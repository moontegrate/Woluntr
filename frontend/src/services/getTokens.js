import { _server, postRequest } from "./http";

const getTokens = async () => {
    localStorage.removeItem("access_token");

    const response = await postRequest(`${_server}/auth/jwt/refresh/`, {
        refresh: localStorage.getItem('refresh_token')
    }, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    });

    const { access } = response;

    localStorage.setItem("access_token", access);
};

export default getTokens;