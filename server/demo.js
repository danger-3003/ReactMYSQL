const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing_node"
});

app.get('/api/data', (req, res) => {
    con.query("SELECT * FROM node", (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(data);
        }
    });
});

app.post('/api/data', (req, res) => {
    const values = [
        req.body.email,
        req.body.password
    ];
    con.query("INSERT INTO node (email, password) VALUES (?, ?)", values, (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send("Error in pushing data into DB");
        } else {
            res.send(data);
        }
    });
});

app.listen(3000);
