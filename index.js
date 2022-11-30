const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken')


//middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('resale server are running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9wccxu2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//json web token middleware
const verifyJWT = (req, res, next) => {
    const headers = req.headers.authorization;
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

async function run() {
    try {
        const productsCollection = client.db('resaleProducts').collection('allProducts');
        const categoryCollection = client.db('resaleProducts').collection('category');
        const usersCollection = client.db('resaleProducts').collection('users')
        const bookingsCollection = client.db('resaleProducts').collection('bookings')
        const blogsCollection = client.db('resaleProducts').collection('blogs')
        const addProductsCollection = client.db('resaleProducts').collection('addProducts')
        const advertiseCollection = client.db('resaleProducts').collection('advertise')

        app.get('/category', async (req, res) => {
            const query = {};
            const result = await categoryCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/category/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            const result = await productsCollection.findOne(query);
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await usersCollection.insertOne(users);
            res.send(result);
        })
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        app.get('/seller', async (req, res) => {
            const result = await usersCollection.find({ role: 'seller' }).toArray();
            res.send(result)
        })
        app.delete('/seller/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })
        app.get('/buyer', async (req, res) => {
            const result = await usersCollection.find({ role: 'buyer' }).toArray();
            res.send(result)
        })
        app.delete('/buyer/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // app.get('/users/all-user', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { email: email }
        //     const user = await usersCollection.findOne(query)
        //     if (user) {
        //         return res.send({ isAdmin: user?.role === 'admin', role: 'admin' })
        //     }
        //     if (user) {
        //         return res.send({ isSeller: user?.role === 'seller', role: 'seller' })
        //     }
        //     if (user) {
        //         return res.send({ isBuyer: user?.role === 'buyer', role: 'buyer' })
        //     }
        // })


        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking)
            res.send(result)
        })

        app.get('/blogs', async (req, res) => {
            const query = {};
            const result = await blogsCollection.find(query).toArray();
            res.send(result);
        })
        app.post('/add-products', async (req, res) => {
            const product = req.body;
            const result = await addProductsCollection.insertOne(product);
            res.send(result);
        })
        app.get('/add-products', verifyJWT, async (req, res) => {
            const email = req.query.email;
            const decodedEmail = req.decoded.email;
            if (email !== decodedEmail) {
                return res.status(403).send('Forbidden ')
            }
            const query = { email: email }
            const result = await addProductsCollection.find(query).toArray();
            res.send(result)
        })
        app.delete('/add-products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await addProductsCollection.deleteOne(query)
            res.send(result)
        })
        app.post('/add-advertise', async (req, res) => {
            const advertise = req.body;
            const query = { productName: advertise.productName }
            const alreadyAdvertised = await advertiseCollection.find(query).toArray();
            if (alreadyAdvertised.length) {
                return res.send({ acknowledged: false, message: 'Already Advertised' })
            }
            const result = await advertiseCollection.insertOne(advertise);
            res.send(result);
        })
        app.get('/add-advertise', async (req, res) => {
            const query = {};
            const result = await advertiseCollection.find(query).toArray();
            res.send(result);
        })
        // Json web token
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN)
                return res.send({ accessToken: token })
            }
            res.status(401).send({ accessToken: '' })
        })
    }
    catch (error) {
        console.log(error);
    }
}
run().catch(console.dir)



app.listen(port, () => {
    console.log(`server are running on: ${port}`);
})