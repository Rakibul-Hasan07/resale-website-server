const advertiseModels = require('../Models/advertiseModels')

const saveAdvertise = async (req, res) => {
    try {
        const advertise = req.body;
        const allreadyAdvertised = await advertiseModels.find({ productName: advertise.productName });
        if (allreadyAdvertised.length) {
            return res.send({ acknowledged: false, message: 'Already Advertised' })
        }
        const result = new advertiseModels(advertise);
        await result.save()
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}
const getAdvertise = async (req, res) => {
    try {
        const result = await advertiseModels.find();
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

const getAdvertiseById = async (req, res) => {
    try {
        const result = await advertiseModels.findOne({ _id: req.params.id })
        if (!result) {
            res.status(404).send('Server Error')
        }
        res.send(result)
    } catch (error) {
        res.status(404).send('Server Error')
    }
}
module.exports = { saveAdvertise, getAdvertise, getAdvertiseById }