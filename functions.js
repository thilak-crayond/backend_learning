const { generateUUID, getFileData, writeFileData } = require('./utils');

// insert an user data 
const InsertUserData = ({
    first_name,
    age,
    last_name,
    country
}) => {
    // custom control for over asynchronous operations
    return new Promise(async (resolve, reject) => {
        try {
            const uuid = generateUUID();
            // its an existing data because we use a local db 
            // incase we use a DB Table we are not use this type of code
            // readfile from existing record
            const fileData = await getFileData();

            // existing data is not success return a data
            if (!fileData?.is_success) {
                resolve("Data not inserted");
                return;
            }
            // create a new record object
            const newRecord = {
                uuid,
                first_name,
                age,
                last_name,
                country
            };

            // we use a new record and existing record construct in a single keyword
            const newRecords = [...fileData?.data, newRecord];
            // write a file data for a new records
            const success = await writeFileData(newRecords);

            if (success) {
                resolve("Data inserted successfully");
            } else {
                resolve("Data not inserted");
            }
        } catch (error) {
            console.error("Error inserting data:", error); // Log the error message
            reject(error); // Reject the promise with the error
        }
    });
};

// get a user data 
const getUserData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileData = await getFileData();

            if (fileData?.is_success) {
                resolve({
                    message: "Get user data successfully",
                    data: fileData.data // Adjusted to return only the data array
                });
            } else {
                resolve({
                    message: "User data not retrieved",
                    data: []
                });
            }
        } catch (error) {
            reject({
                message: "Error retrieving user data",
                error: error.message
            });
        }
    });
};

// get a user with an id
const getUserIdData = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileData = await getFileData();

            if (fileData?.is_success) {
                // Find the item by UUID
                const item = fileData.data.find(recordid => recordid.uuid === userId);

                // If item found, resolve with the item data
                if (item) {
                    resolve({
                        message: "User data retrieved successfully",
                        data: item // Return only the item data
                    });
                } else {
                    resolve({
                        message: `No user found with ID ${userId}`,
                        data: null
                    });
                }
            } else {
                resolve({
                    message: "User data not retrieved",
                    data: null
                });
            }
        } catch (error) {
            reject({
                message: "Error retrieving user data",
                error: error.message
            });
        }
    });
}

// update a user with an id
const putUserData = (userId, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileData = await getFileData();

            if (fileData?.is_success) {
               
                const itemIndex = fileData?.data?.findIndex(record => record.uuid === userId);

                if (itemIndex === -1) {
                    resolve({
                        message: `Item with ID ${userId} not found`,
                        data: null
                    });
                    return;
                }

               
                const updatedItem = {
                    ...fileData.data[itemIndex], // Keep existing fields
                    ...updatedData,
                };

              
                fileData.data[itemIndex] = updatedItem;

                // Write the updated data back to the file
                const success = await writeFileData(fileData.data);

                if (success) {
                    resolve({
                        message: "Item updated successfully",
                        data: updatedItem
                    });
                } else {
                    resolve({
                        message: "Failed to update item",
                        data: null
                    });
                }
            } else {
                resolve({
                    message: "Failed to retrieve data",
                    data: null
                });
            }
        } catch (error) {
            reject({
                message: "Error updating user data",
                error: error.message
            });
        }
    });
};

// delete a user data with an id
const deleteUserData = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileData = await getFileData(); // Fetch current data

            if (fileData?.is_success) {
                // Check if the item exists by finding its index
                const itemIndex = fileData?.data?.findIndex(record => record.uuid === userId);

                if (itemIndex === -1) {
                    resolve({
                        message: `Item with ID ${userId} not found`,
                    });
                    return;
                }

                // Filter out the item to delete it
                const updatedData = fileData.data.filter(record => record.uuid !== userId);

                // Write the updated data back to the file
                const success = await writeFileData(updatedData);

                if (success) {
                    resolve({
                        message: `Item with ID ${userId} deleted successfully`,
                    });
                } else {
                    resolve({
                        message: "Failed to delete the item",
                    });
                }
            } else {
                resolve({
                    message: "Failed to retrieve data",
                });
            }
        } catch (error) {
            reject({
                message: "Error retrieving user data",
                error: error.message,
            });
        }
    });
};




module.exports = {
    InsertUserData,
    getUserData,
    getUserIdData,
    putUserData,
    deleteUserData
};
