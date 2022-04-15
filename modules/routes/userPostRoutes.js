const express = require("express")
const router = express.Router()
const passport = require("passport")

// local modules
const {USER} = require("../userDB")
const showError = require("../error.js")

router.use(express.urlencoded({extended: true}))
router.use(function(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect("/login")
    }
    return next()
})

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
    console.log(req.body)
    const {email, walletAddress} = req.body
    if(!email.trim()) return showError(req,"/account", "email field value cannot be empty", res)
    USER.updateOne({email : req.user.email}, {email, walletAddress}, function(err, data){
        if(err) return showError(req,"/account", "an error occured, please report this problem", res)
        return res.redirect("/account")
    })
})







module.exports = router