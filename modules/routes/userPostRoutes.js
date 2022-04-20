const express = require("express")
const router = express.Router()
const passport = require("passport")
const upload = require("../multer").single("receipt")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const {addDays} =  require("date-fns")

// local modules
const {USER, TRANSACTION} = require("../userDB")
const showError = require("../error.js")
const NORMAL = require("../staticDB")
var cloudinary = require('cloudinary').v2;
const getInvestments = require("./user_getRoute").getInvestments


// cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  });


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

// referral link
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
            if(req.user.fundingBallance > Number(amount)){
                USER.updateOne({email : req.user.email}, 
                    {$inc : {fundingBallance :  - Number(amount)}},
                    function(err){
                    if(err){
                        console.log(err)
                        return showError(req,"/withdraw", "an error occured during withdrawal", res)
                    }
                    TRANSACTION.create({
                        user : req.user.email,
                        title : "withdraw",
                        amount : Number(amount)
                    }).then(data=>{
                        return res.redirect("/withdraw")
                    })
                    .catch(err=> {
                        console.log(err)
                        return showError(req,"/withdraw", "an error occured during withdrawal", res)
                    })
                })
            }else{
                return showError(req,"/withdraw", "insufficient ballance", res)
            }

})

router.post("/transfer", function(req,res){
    let update = {}
    const {amount, to, from} = req.body
    console.log(req.body)
   if(Number(amount) && to && from){
           if(req.user[from] > Number(amount)){
               if(req.user[from] == req.user[to]) return res.redirect("/transfer")
               update[from] = req.user[from] - Number(amount)
               update[to] = req.user[to] + Number(amount)
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
   }else{
    return showError(req,"/transfer", "your transfer couldn't go through", res)
   }
})
let loc = path.join(__dirname,'../../uploads')
router.post("/deposit",function(req,res){
    upload(req, res, function (err) {
       const {means, amount} = req.body
        if (err instanceof multer.MulterError) {
          return showError(req,"/deposit", "a run time error occured, please report this to the management", res)
        } else if (err) {
          console.log("error occured in multer", err.message)
          // An unknown error occurred when uploading.
          return showError(req,"/deposit", err.message, res)
        }
               // Everything went fine.
        cloudinary.uploader.upload(loc+"/"+req.file.filename, {
            folder : "receipt",
            use_filename :true, 
            // unique_filename : true,
          },
            function(error, result) {
                if(error){
                    console.log(error)
                    return showError(req,"/deposit", "an error occured, trying to upload your file", res)
                }
                TRANSACTION.create({
                    user : req.user.email,
                    title : "deposit",
                    means,
                    amount : Number(amount),
                    imageurl:  result.secure_url
                })
                  .then(()=> {
                        return showError(req,"/deposit", "succesfully uploaded, awaiting confirmation", res)
                    }).catch(err=>{
                        console.log(err)
                        return showError(req,"/deposit", "an error occured in trying to make deposit", res)
                    })
            });

      })
})

router.post("/loan", function(req,res){
    if(Number(req.body.amount)){
        TRANSACTION.create({
            user : req.body.email,
            title : "loan", 
            amount : Number(req.body.amount)
        }).then(()=>{
            return showError(req,"/loan", "Your application has been submitted", res)
        })
        .catch(err=> {
            console.log(err)
            return showError(req,"/loan", "an error occured applying for loans, report this", res) 
        })
    }else{
        return showError(req,"/loan", "invalid amount submitted", res)
    }
})
// getInvestments
// haven't stopped user from investing if they have a running inv
console.log(new Date(addDays(Date.now(), 5)).getTime())
router.post("/invest", function(req,res){
    if(req.user[req.body.type] >= Number(req.body.amount)){
        if(req.body.type == "shortBallance"){
            NORMAL.findOne({title : req.body.title}, function(err,plan){
                if(err){
                 console.log(err)
                return showError(req,"/invest", "an error occured applying trying to locate your plan, please report this", res) 
                }
                if(!plan) return showError(req,"/invest", "couldn't find your selected plan", res)
                if(Number(req.body.amount) >= plan.min && Number(req.body.amount) <= plan.max){
                    USER.updateOne({email : req.user.email}, {
                        shortBallance : req.user.shortBallance - Number(req.body.amount),
                        $push : {
                            normalInvestments :{
                                title : plan.title,
                                roi : plan.roi,
                                expiry : new Date(addDays(Date.now(), plan.duration)).getTime(),
                                amount : Number(req.body.amount),
                                profit : (Number(req.body.amount) * (plan.roi/100))
                            }
                         }
                    }).then(()=> res.redirect("/invest"))
                    .catch(err=>{
                            console.log(err.message)
                            return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
                    })
                }else{
                    return showError(req,"/invest", `can't invest $${req.body.amount} in ${req.body.title} `, res) 
                }
            })
        }
    }else{
        return showError(req,"/invest", "insufficient ballance", res)
    }
})

module.exports = router