const API_URL = 'http://localhost:8000/baladiya/';

export const setToken = (token) => {
    sessionStorage.setItem('token',token);
}

export const getToken = (token) => {
    return sessionStorage.getItem('token')
}

export const removeToken = () => {
    sessionStorage.removeItem('token');
}


export { API_URL };
