const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config();


//middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('resale server are running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9wccxu2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const productsCollection = client.db('resaleProducts').collection('allProducts');
        const categoryCollection = client.db('resaleProducts').collection('category');
        const usersCollection = client.db('resaleProducts').collection('users')
        const bookingsCollection = client.db('resaleProducts').collection('bookings')
        const blogsCollection = client.db('resaleProducts').collection('blogs')

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

       
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking)
            res.send(result)
        })
        app.get('/bookings', async (req, res) => {
            const getEmail = req.query.email;
            const query = { email: getEmail }
            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/blogs', async (req, res) => {
            const query = {};
            const result = await blogsCollection.find(query).toArray();
            res.send(result);
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