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

function deleteArticle(articleId) {
    return axios({
        url: `${API_URL}/articles/${articleId}`,
        method:'DELETE',
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export default {
    getArticles,
    deleteArticle
}