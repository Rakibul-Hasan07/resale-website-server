const userModels = require('../Models/userModels')
const jwt = require('jsonwebtoken')

const saveUsers = async (req, res) => {
    try {
        const users = req.body;
        const result = new userModels(users);
        await result.save();
        res.send(result);
    } catch (error) {
        res.status(404).send('Not Found')
    }

}

const getUsers = async (req, res) => {
    try {
        const result = await userModels.findOne({email: req.params.email});
        if (!result) {
            res.status(404).send("Server Error")
        }
        res.send(result);
    } catch (error) {
        res.status(404).send('Not Found')
    }

}

const getSellers = async (req, res) => {
    try {
        const result = await userModels.find({ role: 'seller' });
        if (!result) {
            res.status(404).send("Server Error")
        }
        res.send(result)
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

const deleteSeller = async (req, res) => {
    try {
        const result = await userModels.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

const getBuyer = async (req, res) => {
    try {
        const result = await userModels.find({ role: 'buyer' });
        if (!result) {
            res.send("Dont have buyer")
        }
        res.send(result)
    } catch (error) {
        res.status(404).send('Server Error')
    }
}
const deleteBuyer = async (req, res) => {
    try {
        const result = await userModels.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

const getJWT = async (req, res) => {
    try {
        const email = req.query.email;
        console.log(email)
        const user = await userModels.findOne({ email: req.query.email });
        if (user) {
            const token = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN)
            return res.send({ accessToken: token })
        }
        res.status(401).send({ accessToken: '' })
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

module.exports = { saveUsers, getUsers, getSellers, deleteSeller, getBuyer, deleteBuyer, getJWT }