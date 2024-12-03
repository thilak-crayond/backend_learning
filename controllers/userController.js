// const { User } = require('../models');

// // Get all users
// const getUsers = async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Create a user
// const createUser = async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const user = await User.create({ name, email });
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update a user
// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, email } = req.body;
//         const user = await User.findByPk(id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         user.name = name;
//         user.email = email;
//         await user.save();

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Delete a user
// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findByPk(id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         await user.destroy();
//         res.status(204).json();
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = { getUsers, createUser, updateUser, deleteUser };


const User = require('../models/userModel');
const userValidation = require('../schemas/userSchema');

// Create User
const createUser = async (req, res, next) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, age } = req.body;

    try {
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'This email is already registered.' });
        } else {
            const user = await User.create({ name, email, age });
            res.status(201).json(user);
        }
    } catch (err) {
        next(err);
    }
};

// Get All Users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

// Update User
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.name = name;
        user.email = email;
        user.age = age;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// Delete User
const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
};
