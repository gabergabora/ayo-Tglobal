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
                        $push : {withdrawHistory : {title : "withdraw", amount : Number(amount)}}})
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







module.exports = router