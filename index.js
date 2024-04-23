const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.route');
const { connectDb } = require('./config/db');

const PORT = 3000;

app = express()

app.use(cors())
app.use(express.json());

app.use("/user", userRouter) ;

// to check if server is working 

app.get("/", (req, res) => {
    res.send("Server Working :)")
})

//to check if db is connected

app.listen(PORT, (err) =>{
    if(err){
        console.log("Error in Starting Server -> ", error)
    }
    connectDb().then((res) =>{
        console.log("Mongodb Connected!")
    })
    console.log(`Server started at http://localhost:${PORT}/`)
})