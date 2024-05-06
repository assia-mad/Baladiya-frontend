const API_URL = 'http://137.74.214.49/back/baladiya/';

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
