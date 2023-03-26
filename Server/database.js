import mysql from "mysql2"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const pool = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "comp440"
})

app.post('/register', (req, res)=> {
    const username = req.body.username;
    const passw = req.body.passw;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], 
    (err, results) => {
        if (err) {
            res.send({err: err})
        } 
    
        if (results.length > 0) {
          // Email address is already in use, return an error response
          res.send({message: "Email or Username already in use"})
        } else {
          // Email address is not in use, insert the new user into the database
          pool.query(`
            INSERT INTO users (username, passw, firstName, lastName, email)
            VALUES (?, ?, ?, ?, ?)
        `, [username, passw, firstName, lastName, email],
            (err, result) => {
                if(result.length > 0) {
                    res.send(result)
                }
        }
        );
        }
      });

});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const passw = req.body.passw;

    pool.query(`
        SELECT * FROM users WHERE username = ? AND passw = ?`, [username, passw],
        (err, result) => {
            if (err) {
                res.send({err: err})
            } 
            
            if(result.length > 0) {
                res.send(result)
            } else {
                res.send({message: "Wrong username/password "})
            }
        }
    );
})

app.listen(3001, () => {
    console.log("running")
})


// const getUsers = async () => {
//     const [rows] = await pool.query("SELECT * FROM users");
//     return rows
// }
// const users = await getUsers()
// console.log(users)
// const getUser = async (username) => {
//     const [rows] = await pool.query(`
//         SELECT *
//         FROM users
//         WHERE username = ?
//     `, [username]);
//     return rows[0]
// }

// const createNote = async(username, passw, firstName, lastName, email) => {
//     const [result] = await pool.query(
//         `
//             INSERT INTO users (username, passw, firstName, lastName, email)
//             VALUES (?, ?, ?, ?, ?)
//         `, [username, passw, firstName, lastName, email]
//     )
//     return result
// }

// const result = await createNote("test4", "test4 password", "test4 First", "test4 Last", "test4@test.com")
// console.log(result)