const blogModels = require('../Models/blogModels')

const getBlogs = async (req, res) => {
    try {
        const result = await blogModels.find();
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

module.exports = { getBlogs }