const express = require('express');

// import functions
const { getArticles, createArticle, updateArticle, deleteArticle, getArticleBySlug } = require('../controllers/articleController');

const router = express.Router();

router.get('/', getArticles);
router.post('/', createArticle);

router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

router.get('/slug/:slug', getArticleBySlug);

module.exports = router;