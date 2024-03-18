const getTokens = async () => {
    localStorage.removeItem("access_token");

    const response = await postRequest<TokenResponse>(`${_authBase}refresh/`, {
        refresh_token: refreshToken
    }, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    });

    const { access, refresh } = response;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    return access;
};

export default getTokens;