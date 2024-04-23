const express = require('express');
const { heathRouter } = require('./routes/health.route');
const PORT = 3000
app = express()

app.use(express.json());

app.use("/health", heathRouter) ;

console.log("outside")

app.get("/", (req, res) => {
    res.send("working")
})

app.listen(PORT, (err) =>{
    if(err){
        console.log(error, " error")
    }
    console.log("Server started ", PORT)
})