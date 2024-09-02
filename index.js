// access a express
const express = require('express');
const morgan = require('morgan');
const app = express();
const { InsertUserData, getUserData, getUserIdData } = require("./functions")

// middleWare 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))


// post
app.post('/items', async (req, res) => {
    const data = await InsertUserData({ ...req?.body })
    res.send({
        message: data
    })
});

app.get('/items', async (req, res) => {
    const data = await getUserData({
        ...req?.body
    })
    res.send({
        message: data
    })
});

app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getUserIdData(id);

        if (result.data) {
            res.send(result);
        } else {
            res.status(404).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



// localhost server port
app.listen(2000, () => {
    console.log('server')
})