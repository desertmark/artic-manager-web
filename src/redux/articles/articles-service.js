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

function getArticle(articleId) {
    return axios({
        url: `${API_URL}/articles/${articleId}`,
        method:'GET',
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function createArticle(article) {
    return axios({
        url: `${API_URL}/articles/`,
        method:'POST',
        data: article
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    }); 
}

function editArticle(article) {
    return axios({
        url: `${API_URL}/articles/${article._id}`,
        method:'PUT',
        data: article
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
    getArticle,
    getArticles,
    createArticle,
    editArticle,
    deleteArticle
}