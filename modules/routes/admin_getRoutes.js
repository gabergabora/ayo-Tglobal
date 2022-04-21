const express = require("express")
const { USER , SHORTINVS} = require("../userDB")
const adminRoute = express.Router()
const {formatDistanceToNow, format,} = require("date-fns")
const { getInvestments } = require("./user_getRoute")


adminRoute.get("/login", function(req,res){
    res.render("admin/admin-login")
})

const isAuth = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.admin){
            res.locals.admin = req.user
          return  next()
        }else{
            res.redirect('/login')
        }
    }else{
        return res.redirect('login')
    }
}
adminRoute.use(async function(req,res,next){
    res.locals.users = await USER.find({})
    res.locals.reqUrl = req.url
    res.locals.formatDistanceToNow = formatDistanceToNow
    res.locals.format = format
    next()
})
// remember this thing with the title always returns the withdraw doc
const getTransactions = function(title){
    return function(req,res,next){
       return TRANSACTION.find({title, confirmed : false}, function(err, data){
            if(err) return res.send("error getting users transactions")
            res.locals.transactions = data
            next()
       })
    }
}



adminRoute.get("/dashboard",isAuth, function(req,res){
    res.render("admin/admin-dashboard")
})

adminRoute.get("/updatePlans",isAuth, getInvestments, function(req,res){
    res.render("admin/admin-updatePlans")
})

adminRoute.get("/deposit",isAuth, getTransactions('deposit'), function(req,res){
    res.render("admin/admin-deposits")
})

adminRoute.get("/withdraw",isAuth, getTransactions('withdraw'), function(req,res){
    res.render("admin/admin-withdraw")
})

adminRoute.get("/loan",isAuth,getTransactions('loan'), function(req,res){
    res.render("admin/admin-loan")
})

adminRoute.get("/account",isAuth, function(req,res){
    res.render("admin/admin-account")
})

adminRoute.get('/logout', function(req,res){
    req.logout()
    res.redirect('login')
})
module.exports = adminRoute