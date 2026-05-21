import axios from 'axios';
import constants from '../constants';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Fetch articles
export const fetchArticles = () => API.get('/articles');
// Create article
export const createArticle = (article) => API.post('/articles', article);
// Update article
export const updateArticle = (id, article) => API.put(`/articles/${id}`, article);
// Delete article
export const deleteArticle = (id) => API.delete(`/articles/${id}`);
// Get article by slug
export const getArticleBySlug = (slug) => API.get(`/articles/slug/${slug}`);