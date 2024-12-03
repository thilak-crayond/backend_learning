// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

// const User = sequelize.define('User', {
//     uuid: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//     },
//     first_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     last_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     country: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// });


// module.exports = User;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = User;
