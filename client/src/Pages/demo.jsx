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

// Adding data
app.post('/api/data', (req, res) => {
    const values = [
        req.body.userName,
        req.body.email,
        req.body.password
    ];
    con.query("SELECT email FROM user_data WHERE email = ?", [req.body.userName], (err, data) => {
        if (err) throw err;
        else if (data.length > 0) {
            res.send({ message: 'email already exists' });
        } else {
            con.query("INSERT INTO user_data (userName, email, password) VALUES (?, ?, ?)", values, (err, data) => {
                if (err) {
                    console.error('Error running query:', err);
                    res.send("error in pushing data into db");
                } else {
                    res.send(data);
                }
            });
        }
    });
});

// Retrieving data of all individuals
app.get('/api/data', (req, res) => {
    con.query("SELECT * FROM user_data", (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(data);
        }
    });
});

// Retrieving data for individual profile
app.get('/api/data/:userName', (req, res) => {
    const userName = req.params.userName;
    con.query("SELECT * FROM user_data WHERE userName = ?", [userName], (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(data);
        }
    });
});

// Deleting records in DB
app.delete('/api/data/:userName', (req, res) => {
    const userName = req.params.userName;
    con.query("DELETE FROM user_data WHERE userName = ?", [userName], (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error deleting data' });
        } else {
            res.send(data);
        }
    });
})

// Updating values into DB
app.put('/api/data/:userName', (req, res) => {
    const userName_Param = req.params.userName;
    const values = [
        req.body.userName,
        req.body.email,
        req.body.password
    ];
    con.query("UPDATE user_data SET userName = ?,values.concat(userName_Param) email = ?, password = ? WHERE userName = ?", , (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.send("error in updating the db");
        } else {
            res.send(data);
        }
    });
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
