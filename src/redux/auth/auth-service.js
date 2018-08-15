import axios from 'axios';

function login(values) {
    return axios({
        url: `${API_URL}/auth/login`,
        method: 'POST',
        data: values
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
        console.log('Error loging in:', error);
        throw error.response.data;
    });
}

function logout() {
    clearLocalSession();
    return axios({
        url: `${API_URL}/auth/logout`,
        method:'GET',
    })
    .catch(error => {
        console.log('Error login out:', error);
        throw error.response.data;
    });
}

function storeSession(session) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
    localStorage.setItem('session', JSON.stringify(session));
}

function getLocalStorageSession() {
    const session = JSON.parse(localStorage.getItem('session') || "{}");
    if(session) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
    }
    return session;
}

function clearLocalSession() {
    localStorage.setItem('session', null);
}

export default {
    login,
    logout,
    storeSession,
    getLocalStorageSession
}