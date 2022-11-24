const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9wccxu2.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productsCollection = client.db('resaleProducts').collection('allProducts');
        const categoryCollection = client.db('resaleProducts').collection('category');

        app.get('/category', async (req, res) => {
            const query = {};
            const result = await categoryCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/category/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            const result = await productsCollection.findOne(query);
            // const matchedId = products.find(product => product.category.id === id)
            res.send(result);
        })
    }
    catch (error) {
        console.log(error);
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('resale server are running')
})

app.listen(port, () => {
    console.log(`server are running on: ${port}`);
})