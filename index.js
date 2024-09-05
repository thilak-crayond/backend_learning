// access a express
const express = require('express');
// access a middle ware
const morgan = require('morgan');
// access a express with an app
const app = express();
// import a api functions
const { InsertUserData, getUserData, getUserIdData, putUserData, deleteUserData } = require("./functions")

// middleWare 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))


// post 
// Create a user 
app.post('/items', async (req, res) => {
    const data = await InsertUserData({ ...req?.body })
    res.send({
        message: data
    })
});

// get 
// get a all user
app.get('/items', async (req, res) => {
    const data = await getUserData({
        ...req?.body
    })
    res.send({
        message: data
    })
});

// get with id
// get a specific user with an id
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


// put with id
// update a user with an id
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; 

    try {
        const result = await putUserData(id, updatedData);

        if (result.data) {
            res.send(result); // Send back the success response
        } else {
            res.status(404).send(result); 
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete with id
// delete a user with an id
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteUserData(id); 

        if (result.success) {
            res.send(result); // Send back the success response
        } else {
            res.status(404).send(result);
        }
    } catch (error) {
        res.status(500).send({
            message: "Error deleting the item",
            error: error.message
        }); 
    }
});



// localhost server port
app.listen(2000, () => {
    console.log('server')
})