const express = require("express")
const router = express.Router()
const passport = require("passport")

// local modules
const {USER} = require("../userDB")
const showError = require("../error.js")

router.use(express.urlencoded({extended: true}))
// router.use(function(req,res,next){
//     if(!req.isAuthenticated()){
//         return res.redirect("/login")
//     }
//     return next()
// })

router.post("/register", 
function(req,res, next){
    console.log(req.body)
    USER.findOne({email : req.body.email})
    .then(user=>{
        if(user) {
            return showError(req,"/register",  "this email isn't available", res)
        }
            else {
                req.body.email = req.body.email.toLowerCase()
                USER.create(req.body, function(err){
                if(err){
                    console.log(err.message)
                    return showError(req, "/register", "make sure all inputs are filled", res)
                }
                return next()
            })
        }
    })
},
passport.authenticate("user",{
    successRedirect : "/dashboard",
    failureRedirect : "/register",
    failureFlash : true
}))

router.post("/register/:id", 
function(req,res, next){
    console.log(req.body)
    USER.findOne({email : req.body.email})
    .then(user=>{
        if(user) {
            return showError(req,"/register",  "this email isn't available", res)
        }
            else {
                req.body.email = req.body.email.toLowerCase()
                USER.create(req.body, function(err){
                if(err){
                    console.log(err.message)
                    return showError(req, "/register", "make sure all inputs are filled", res)
                }
                USER.updateOne({id : req.params.id}, {$push : {referrals : req.body.email}}, function(err,data){
                    if(err){
                        console.log("error trying to update referral list")
                    }
                })
                return next()
            })
        }
    })
},
passport.authenticate("user",{
    successRedirect : "/dashboard",
    failureRedirect : "/register",
    failureFlash : true
}))

router.post("/account", function(req,res){
    const {email, walletAddress} = req.body
    if(!email.trim()) return showError(req,"/account", "email field value cannot be empty", res)
    USER.updateOne({email : req.user.email}, {email, walletAddress}, function(err, data){
        if(err) return showError(req,"/account", "an error occured, please report this problem", res)
        return res.redirect("/account")
    })
})

router.post("/withdraw", function(req,res){
    const {amount} = req.body
    if(!Number(amount)) return showError(req,"/withdraw", "your Withdrawal amount value was not accepted", res)
    USER.findOne({email : req.user.email})
    .then(user =>{
        if(user){
            if(user.fundingBallance > Number(amount)){
                USER.updateOne({email : req.user.email}, {fundingBallance :  user.fundingBallance - Number(amount),
                        $push : {history : {title : "withdraw", amount : Number(amount)}}})
                        .then(()=>{res.redirect("/withdraw")})
                    .catch(err=> showError(req,"/withdraw", "an error occured, please report this problem to management", res) )
            }else{
                return showError(req,"/withdraw", "insufficient ballance", res)
            }
        }else{return showError(req,"/withdraw", "please login and try again, an error occured", res)}

    })
    .catch(err=>{
        console.log(err.message, "message occured trying to find user")
        return showError(req,"/withdraw", "an error occured, please report this problem to management", res)
    })

})

router.post("/transfer", function(req,res){
    let update = {}
    const {amount, to, from} = req.body
    console.log(req.body)
   if(Number(amount) && to && from){
       USER.findOne({email : req.user.email}, function(err, data){
           if(err){
               console.log(err.message,"the error occured in.." )
               return showError(req,"/transfer", "an error occured, please report this problem to management", res)
           }
           if(data[from] > Number(amount)){
               update[from] = data[from] - Number(amount)
               update[to] = data[to] + Number(amount)
               console.log("this is the value of the update ", update)
                USER.updateOne({email : req.user.email}, update)
                .then(()=>{
                    res.redirect("/transfer")
                })
                .catch(err=> {
                    console.log(err.message, "error when trying to update")
                    return showError(req,"/transfer", "an error occured, trying to update your ballances,report this problem", res)
                })
           }else{
            return showError(req,"/transfer", "insufficient Ballance", res)
           }
       })
   }else{
    return showError(req,"/transfer", "your transfer couldn't go through", res)
   }
})







module.exports = router