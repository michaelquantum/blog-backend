const express = require('express');
const router = express.Router();
const {getAllBlogs, createBlog} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
router.get('/', getAllBlogs);
router.post('/', createBlog);
module.exports = router;                             