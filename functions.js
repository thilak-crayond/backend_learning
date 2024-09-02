const { generateUUID, getFileData, writeFileData } = require('./utils');

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


module.exports = {
    InsertUserData,
    getUserData
};
