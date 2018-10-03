import axios from 'axios';

function getArticles(params, filters) {
    return axios({
        url: `${API_URL}/articles/search`,
        method:'POST',
        params,
        data: filters
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export default {
    getArticles
}