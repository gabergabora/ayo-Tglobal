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

app.get("/dashboard", function(req,res){
    res.render("dashboard")
})

app.get("/invest", function(req,res){
    res.render("invest")
})

app.get("/deposit", function(req,res){
    res.render("deposit")
})

app.get("/withdraw", function(req,res){
    res.render("withdraw")
})

app.get("/history", function(req,res){
    res.render("transactions")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("server running on port "+ PORT)
})


// forgot password
// 404 page
// 