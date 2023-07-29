const express = require('express')
const router = express.Router();
const { getBlogs } = require('../../Controllers/blogs')

router.get('/blogs', getBlogs)
module.exports = router;