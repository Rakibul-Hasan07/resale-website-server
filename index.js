const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('resale server are running')
})

app.listen(port, () => {
    console.log(`server are running on: ${port}`);
})