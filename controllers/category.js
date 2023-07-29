const categoryModels = require('../Models/categoryModels')
const categoryByProductModel = require('../Models/categoryByProductModel')

const category = async (req, res) => {
    try {
        const getCategory = await categoryModels.find();
        res.send(getCategory)
    } catch (error) {
        res.status(404).send('Not Found')
    }
}

const categoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await categoryByProductModel.findOne({ categoryId: req.params.id });
        if (!result) {
            res.status(404).send('Interner Server Error')
        }
        res.send(result);
    } catch (error) {
        res.status(404).send('Not Found')
    }


}
module.exports = { category, categoryById }