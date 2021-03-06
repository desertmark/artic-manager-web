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
        method:'PATCH',
        data: article
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    }); 
}

function bulkEditArticles(data) {
    return axios({
        url: `${API_URL}/articles`,
        method:'PATCH',
        data
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    }); 
}

function fileEditArticles(file) {
    let form = new FormData();
    form.set('bulk', file);
    return axios({
        url: `${API_URL}/articles`,
        method:'PATCH',
        data: form,
        config: { 
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        }
    }).catch(error => {
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

function getUpdateStatus() {
    return axios({
        url: `${API_URL}/articles/status`,
        method: 'GET'
    }).then(res => res.data)
    .catch(error => {
        console.error(error);
        throw error;
    })
}

export default {
    getArticle,
    getArticles,
    createArticle,
    editArticle,
    bulkEditArticles,
    deleteArticle,
    fileEditArticles,
    getUpdateStatus,
}