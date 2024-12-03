const User = require('../models/userModel');

const seedUsers = async () => {
    try {
        await User.sync({ force: true }); // This will drop the table and recreate it.
        const users = [
            { name: "John Doe", email: "john@example.com", age: 25 },
            { name: "Jane Doe", email: "jane@example.com", age: 28 },
        ];
        await User.bulkCreate(users);
        console.log("Users seeded successfully");
    } catch (err) {
        console.error("Error seeding users:", err);
    }
};

seedUsers();
