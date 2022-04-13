const express = require("express")
const user_getRoute = express.Router()

user_getRoute.use(function(req,res, next){
    res.locals.reqUrl = req.url
    next()
})

user_getRoute.get("/login", function(req,res){
    res.render("login")
})

user_getRoute.get("/register", function(req,res){
    res.render("register")
})

user_getRoute.get("/dashboard", function(req,res){
    res.render("dashboard")
})

user_getRoute.get("/invest", function(req,res){
    res.render("invest")
})

user_getRoute.get("/deposit", function(req,res){
    res.render("deposit")
})

user_getRoute.get("/withdraw", function(req,res){
    res.render("withdraw")
})

user_getRoute.get("/history", function(req,res){
    res.render("transactions")
})

user_getRoute.get("/loan", function(req,res){
    res.render("loan")
})

user_getRoute.get("/account", function(req,res){
    res.render("account")
})

module.exports = user_getRoute