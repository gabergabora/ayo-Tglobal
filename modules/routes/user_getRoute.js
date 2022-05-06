const { format } = require("date-fns")
const express = require("express")
const user_getRoute = express.Router()
const ADMIN = require("../adminDB")
const { TRANSACTION, SHORTINVS, CYCLESINVS } = require("../userDB")

const isAuth = function(req,res, next){
    if(!req.isAuthenticated()){
       return res.redirect("/login")
    }
    res.locals.reqUrl = req.url
    res.locals.user = req.user
    res.locals.format = format
    return next() 
}
const getInvestments = function(req,res, next){
     return ADMIN.findOne({}, function(err, data){
        if(err) return res.send("an error occured on the server, please report this problem")
        res.locals.accounts = data.accounts
        res.locals.normalInvestments = data.normalInvestments
        res.locals.cyclesInvestment = data.cyclesInvestment
        return next()
    })
}
const UserRunningCycle = function(req,res,next){
    return CYCLESINVS.findOne({user : JSON.parse(JSON.stringify((req.user._id))), active : true}, function(err,data){
        if(err) return res.send("an error occured on the server, please report this problem")
        res.locals.userRunningCycle = data
        return next()
    })
}
const getTransactions = function(req,res,next){
    return TRANSACTION.find({email : req.user.email}, function(err, data){
        if(err){
            console.log(err.message)
            return res.send("an error occured on the server, please report this problem")
        }
        res.locals.transactions = data
        next()
    })
}
const userProfits = async function(req,res,next){
    try{
        res.locals.shorts = await SHORTINVS.findOne({user : req.user._id, paid : false})
        res.locals.cycle = await CYCLESINVS.findOne({user : req.user._id, active : true})
       return next()
    }catch(err){
       return res.send('error trying to get profits')
    }

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

user_getRoute.get("/register/:id", function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard")
    }
    return  res.render("register")
})

user_getRoute.get("/dashboard",isAuth,userProfits, function(req,res){
    res.render("dashboard")
})

user_getRoute.get("/invest",isAuth, getInvestments, UserRunningCycle, function(req,res){
    res.render("invest")
})

user_getRoute.get("/deposit",isAuth,getInvestments, function(req,res){
    res.render("deposit")
})

user_getRoute.get("/transfer",isAuth, function(req,res){
    res.render("transfer")
})

user_getRoute.get("/withdraw",isAuth, function(req,res){
    res.render("withdraw")
})

user_getRoute.get("/history",isAuth, getTransactions, function(req,res){
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

module.exports = {user_getRoute, getInvestments}