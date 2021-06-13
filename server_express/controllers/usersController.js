// MySql database Modal and Token ---------------------------------------------------------------------
const mysql2 = require('../services/mysql2')
const queries = require('../queries/userQueries')
const jwt = require('jsonwebtoken')

// ----------------------------------------------------------------------------------------------------
// Users Controller 
// ----------------------------------------------------------------------------------------------------
class UsersController {

    static async register(req, res, next) {
        try {
            const { userName } = req.body
            const foundUser = await isUserExist(userName);
            if (foundUser) return res.json({ message: "user already exist" })

            const insertId = await saveUser(req.body)
            if (insertId) return res.json({ message: "user saved!" })
            return res.json({ message: "error!" })

        } catch (error) {
            console.log(error);
            return res.json({ message: "error!" })
        }
    }
    static async login(req, res, next) {
        try {
            const { userName, password } = req.body;
            const foundUser = await isUserExist(userName, password);

            if (!foundUser) return res.status(401).json({ userStatus: "error" })
            const user = { ...foundUser, password: null }
            const jwtToken = await getJwt(user)
            return res.json({ token: jwtToken, user })

        } catch (error) {
            console.log(error);
            return res.status(401).json({ userStatus: "error" })
        }
    }
    static logout(req, res, next) {
        res.json({ ststus: 'ok', title: 'logout.' });
    }
}

module.exports = UsersController;

async function isUserExist(userName, password = null) {

    const payload = password ? [userName, password] : [userName]
    const query = password ? queries.getUserPasswordExist() : queries.getUserExist()

    const [result] = await mysql2.execute(query, payload)
    const [firstUser] = result;
    return firstUser;
}
function getJwt(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}
async function saveUser(user) {
    const { firstName, lastName, userName, password } = user
    const [result] = await mysql2.execute(queries.insertNewUser(), [firstName, lastName, userName, password])
    return result.insertId
}
