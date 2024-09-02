const fs = require('fs').promises; // Use the promises API to work with async/await

const getFileData = async () => {
    try {
        // data.json is a local db file
        // utf8 is a buffer type or format
        const data = await fs.readFile('data.json', 'utf8');
        return {
            is_success: true,
            data: JSON.parse(data)
        };
    } catch (err) {
        console.error('Error reading file:', err);
        return {
            is_success: false,
            data: []
        };
    }
};

const writeFileData = async (content) => {
    try {
        await fs.writeFile('data.json', JSON.stringify(content, null, 2), 'utf8');
        console.log('File has been written');
        return true;
    } catch (err) {
        console.error('Error writing file:', err);
        return false;
    }
};

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

module.exports = {
    generateUUID,
    writeFileData,
    getFileData
};
