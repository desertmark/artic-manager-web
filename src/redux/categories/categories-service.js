import axios from 'axios';

function getCategories(params, filters) {
    return axios({
        url: `${API_URL}/categories`,
        method:'GET',
        params,
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export default {
    getCategories,
}