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
        const hpCollection = client.db('resaleProducts').collection('hpLaptop')

        app.get('/hp-collection', async (req, res) => {
            const query = {};
            const result = await hpCollection.find(query).toArray();
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