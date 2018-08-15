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

export default {
    getCurrentUser,
    getUser
}