const bookingModels = require('../Models/bookingModels')

const saveBookingsData = async (req, res) => {
    try {
        const booking = req.body;
        const result = new bookingModels(booking)
        await result.save();
        res.send(result)
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

module.exports = { saveBookingsData }