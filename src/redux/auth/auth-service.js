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
    const session = localStorage.getItem('session');
    if(session) {
        const parsedSession = JSON.parse(session);
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedSession.token}`;
        return parsedSession;
    }
}

function clearLocalSession() {
    localStorage.removeItem('session');
}

function passwordUpdate(values) {
    return axios({
        url: `${API_URL}/auth/passwordUpdate`,
        method:'POST',
        data: values
    })
    .catch(error => {
        console.log('Error login out:', error);
        throw error.response.data;
    });
}

export default {
    login,
    logout,
    storeSession,
    getLocalStorageSession,
    clearLocalSession,
    passwordUpdate
}