const express = require('express')
const router = express.router();
const {getUser, createAuthor} = require('../controllers/adminController');
const {protect, authorize} = require('../middleware/auth');

route.use(protect);
router.use(authorize('admin'))

router.get ('/users', getUser);
router.post('/create-author', createAuthor);


module.exports = router