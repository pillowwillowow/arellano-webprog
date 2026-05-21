import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/articles`,
});

// Fetch articles
export const fetchArticles = () => API.get('/');
// Create article
export const createArticle = (data) => API.post('/', data);
// Update article
export const updateArticle = (id, data) => API.put(`/${id}`, data);
// Delete article
export const deleteArticle = (id) => API.delete(`/${id}`);
// Get article by slug
export const getArticleBySlug = (slug) => API.get(`/slug/${slug}`);