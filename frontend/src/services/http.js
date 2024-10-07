import axios from "axios";
import toast from "react-hot-toast";
import getCookie from './getCookie';

export const _host = 'http://localhost';
export const _server = `${_host}:3000`;
export const _apiBase = `http://${_server}/api/`;
export const _authBase = `http://${_server}/auth/`;
export const accessToken = localStorage.getItem('access_token');
export const refreshToken = localStorage.getItem("refresh_token");

// Выгрузка CSRF токена из куки
const csrfToken = getCookie('csrftoken');

// Настройки axios
if (csrfToken) {
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
}
axios.defaults.withCredentials = true;

// Функция для метода DELETE
export const deleteRequest = async (url, data, headers) => {
    try {
        const response = await axios.delete(url, { headers: headers, data: data });

        if (response.status !== 204) {
            throw new Error(`Could not fetch ${url} (DELETE), status: ${response.status}`);
        };

        return response.data;
    } catch (error) {
        throw error;
    };
};

// Функция для метода POST
export const postRequest = async (url, data, headers) => {
    try {
        const response = await axios.post(url, data, { headers });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Could not fetch ${url} (POST), status: ${response.status}`);
        };

        return response.data;
    } catch (error) {
        throw error;
    };
};

// Функция для метода GET
export const getRequest = async (url, headers) => {
    try {
        const response = await axios.get(url, { headers: headers });

        if (response.status !== 200) {
            console.log(`Could not fetch ${url} (GET), status: ${response.status}`);
            toast('Упс. Ошибка при отправке запроса. Пожалуйста, повторите попытку.', {
                position: 'bottom-right',
                icon: '🤔'
            });
        };

        return response.data;
    } catch (error) {
        console.log(error);
    };
};

// Функция для метода PUT
export const putRequest = async (url, data, headers) => {
    try {
        const response = await axios.put(url, data, { headers });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Could not fetch ${url} (PUT), status: ${response.status}`);
        };

        return response.data;
    } catch (error) {
        throw error;
    };
};

// Функция для метода PATCH
export const patchRequest = async (url, data, headers) => {
    try {
        const response = await axios.patch(url, data, { headers });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Could not fetch ${url} (PATCH), status: ${response.status}`);
        };

        return response.data;
    } catch (error) {
        throw error;
    };
};