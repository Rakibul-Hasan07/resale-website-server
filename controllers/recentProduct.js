const recentProductModels = require('../Models/recentProductModels')

const getProducts = async (req, res) => {
    try {
        const result = await recentProductModels.find();
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

module.exports = {getProducts}