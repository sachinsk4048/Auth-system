// app.js
const authRouter = require('./routers/authRouter')

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.get('/', (req, res) => {
//     res.send('hyy');
// })

app.use(authRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('database connected succesfully')
    app.listen(process.env.PORT, () => {
        console.log(`server is running on http://localhost:${process.env.PORT}`);
    })
}).catch((err) => {
    console.log('error while connecting to db', err);
})