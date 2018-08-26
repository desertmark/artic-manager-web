import axios from 'axios';

function getCurrentUser(session) {
    const userId = session.claims.sub;
    return getUser(userId);
}

function getUser(userId) {
    return axios({
        url: `${API_URL}/users/${userId}`,
        method: 'GET'
    })
    .then(res => res.data)
    .catch(error => {
        throw error.response
    });
}

function getUsers() {
    return axios({
        url: `${API_URL}/users/`,
        method: 'GET'
    })
    .then(res => res.data)
    .catch(error => {
        throw error.response
    });
}

function updateUser(userId, values) {
    return axios({
        url: `${API_URL}/users/${userId}`,
        method: 'PUT',
        data: values
    })
    .then(res => res.data)
    .catch(error => {
        throw error.response
    });
}

export default {
    getCurrentUser,
    getUser,
    getUsers,
    updateUser
}