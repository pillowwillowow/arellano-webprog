import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/api/articles`,
});

// Fetch articles
export const fetchArticles = () => API.get("/");

// Create article
export const createArticle = (article) => API.post("/", article);

// Update article
export const updateArticle = (id, article) =>
  API.put(`/${id}`, article);

// Delete article
export const deleteArticle = (id) =>
  API.delete(`/${id}`);

// Get article by slug
export const getArticleBySlug = (slug) =>
  API.get(`/slug/${slug}`);