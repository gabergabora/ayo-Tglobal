const express = require("express")
const user_getRoute = express.Router()

const isAuth = function(req,res, next){
    if(!req.isAuthenticated()){
       return res.redirect("/login")
    }
    res.locals.reqUrl = req.url
    res.locals.user = req.user
    return next() 
}

user_getRoute.get("/login", function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard")
    }
    return res.render("login")
 })

 
user_getRoute.get("/register", function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard")
    }
    return  res.render("register")
})

user_getRoute.get("/dashboard",isAuth, function(req,res){
    res.render("dashboard")
})

user_getRoute.get("/invest",isAuth, function(req,res){
    res.render("invest")
})

user_getRoute.get("/deposit",isAuth, function(req,res){
    res.render("deposit")
})

user_getRoute.get("/transfer",isAuth, function(req,res){
    res.render("transfer")
})

user_getRoute.get("/withdraw",isAuth, function(req,res){
    res.render("withdraw")
})

user_getRoute.get("/history",isAuth, function(req,res){
    res.render("transactions")
})

user_getRoute.get("/loan",isAuth, function(req,res){
    res.render("loan")
})

user_getRoute.get("/account",isAuth, function(req,res){
    res.render("account")
})

user_getRoute.get("/logout",isAuth, function(req,res){
    req.logout()
    res.redirect("/login")
})

module.exports = user_getRoute