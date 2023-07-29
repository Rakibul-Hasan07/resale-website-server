const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const uri = process.env.DB_URI;
const paymentRouter = require('./routers/v1/payment.route')
const categoryRouter = require('./routers/v1/category.route')
const userRouter = require('./routers/v1/users.route')
const blogRouter = require('./routers/v1/blogs.route')
const productsRouter = require('./routers/v1/products.route')
const advertiseRouter = require('./routers/v1/advertise.route')
const bookingRouter = require('./routers/v1/booking.route')

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('database are connected') })
    .catch((error) => { console.log('database connected failed:', error.message) })

//middle ware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('resaleUser server are running')
})



app.use('/api/v1', paymentRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', blogRouter)
app.use('/api/v1', productsRouter)
app.use('/api/v1', advertiseRouter)
app.use('/api/v1', bookingRouter)


app.listen(port, () => {
    console.log(`server are running on: ${port}`);
})