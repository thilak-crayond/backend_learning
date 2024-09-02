// access a express
const express = require('express');
const morgan = require('morgan');
const app = express();


// middleWare how to access
app.use(morgan('dev'))

// // middileware
// app.use((req, res, next) => {
//     console.log('im middleware');
//     next();
// })

// localhost server port
app.listen(2000, () => {
    console.log('server')
})



// get
app.get('/', (req, res) => {
    res.send('This is our first web server created')
})

// // about
// app.get('/about', (req, res) => {
//     res.send('This is our first about')
// })

// // how to create a api

// app.get('/noRoute', (req, res) => {
//     res.json('This is our first api')
// })
