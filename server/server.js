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

//adding data
app.post('/api/data',(req,res)=>{
    const values=[
        req.body.userName,
        req.body.email,
        req.body.password
    ];
    con.query("select email from user_data where email = ?",[req.body.userName],(err,data)=>{
        if (err) throw err;
        else if(data.length > 0)
        {
            res.send({message: 'email already exists'});
        }
        else
        {
            con.query("insert into user_data (userName, email, password ) values (?, ?, ?)",values,(err,data) =>{
                if(err){
                    console.error('Error running query:', err);
                    res.send("error in pushing data into db");
                }else{
                    res.send(data);
                }
            });
        }
    })
});

//retreving data of all individuals
app.get('/api/data', (req, res) => {
    con.query("select * from user_data", (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(data);
        }
    });
});

//Retrevng data for individual profile
app.get('/api/data/:userName', (req, res) => {
    const userName = req.params.userName;
    con.query("select * from user_data where userName = ?", [userName] , (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(data);
        }
    });
});

//deleting records in DB
app.delete('/api/data/:userName', (req,res) => {
    const userName = req.params.userName;
    con.query("delete from user_data where userName = ?", [userName] , (err, data) => {
        if (err) {
            console.error('Error running query:', err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            res.send(data);
        }
    });
})

//updating values into DB
app.put('/api/data/:userName', (req,res) => {
    const userName_Param = req.params.userName;
    const values=[
        req.body.userName,
        req.body.email,
        req.body.password
    ];
    con.query("update user_data set userName = ?, email = ?, password = ? where userName = ?",values.concat(userName_Param), (err, data) =>{
        if(err){
            console.error('Error running query:', err);
            res.send("error in updating the db");
        }
        else
        {
            res.send(data);
        }
    })

})

app.listen(3000);
