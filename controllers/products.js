const productModels = require('../Models/productModels')
const jwt = require('jsonwebtoken')

//json web token middleware
const verifyJWT = (req, res, next) => {
    const headers = req.headers.authorization;
    // console.log(headers)
    if (!headers) {
        return res.status(401).send('Unauthorized access')
    }
    const token = headers.split(' ')[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send('Forbidden access')
        }
        req.decoded = decoded;
        next();

    })
}

const saveProducts = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = new productModels(product);
        const result  = await newProduct.save();
        res.send(result);
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

const getProducts = async (req, res) => {
    try {
        const email = req.query.email;
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            return res.status(403).send('Forbidden ')
        }
        const result = await productModels.find({ email: email });
        res.send(result)
    } catch (error) {
        res.status(404).send('Server Error')
    }
}

const deleteProducts = async (req, res) => {
    try {
        const result = await productModels.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (error) {
        res.status(404).send('Server Error')
    }
}
module.exports = {verifyJWT, saveProducts, getProducts,deleteProducts }