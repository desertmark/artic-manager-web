import axios from 'axios';

function getArticles(params) {
    return axios({
        url: `${API_URL}/articles`,
        method:'GET',
        params
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export default {
    getArticles
}