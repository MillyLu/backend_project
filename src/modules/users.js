const fs = require('fs');
const path = require("path");



const getUsers = () => {
    return fs.readFileSync(path.resolve(__dirname, "../data/users.json"));
}

module.exports = getUsers;