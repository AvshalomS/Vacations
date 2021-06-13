const query = {
    getUserExist: () => `SELECT * FROM users where userName = ?`,
    getUserPasswordExist: () => `SELECT * FROM users where userName = ? and password = ?`,
    insertNewUser: () => `INSERT INTO users (firstName,lastName,userName,password) VALUES( ? , ? , ? , ? )`
}
module.exports = query;