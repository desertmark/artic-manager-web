import axios from 'axios';

function login(values) {
    return axios({
        url: `${API_URL}/auth/login`,
        method: 'POST',
        data: values
    })
    .then(res => res.data)
    .catch(error => {
        console.log('Error loging in:', error);
        throw error.response.data;
    });
}

export default {
    login
}