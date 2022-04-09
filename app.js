const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use("/assets",express.static("assets"))


app.get("/login", function(req,res){
    res.render("login")
})

app.get("/register", function(req,res){
    res.render("register")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("server running on port "+ PORT)
})