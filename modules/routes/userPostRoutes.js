const express = require("express")
const router = express.Router()
const passport = require("passport")
const upload = require("../multer").single("receipt")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const {addDays} =  require("date-fns")

// local modules
const {USER, TRANSACTION, SHORTINVS, CYCLESINVS} = require("../userDB")
const showError = require("../error.js")
const ADMIN = require("../adminDB")
const { getInvestments } = require("./user_getRoute")
var cloudinary = require('cloudinary').v2;
const {transporter, Message} = require('../nodemailer')
const welcome = require('../email-templates/welcome')
const {depositRequest} = require('../email-templates/deposit')
const {withdrawRequest} = require('../email-templates/withdraw')
const {loanRequest} = require('../email-templates/loan')




// cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  });


router.use(express.urlencoded({extended: true}))
const isAuth = function(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect("/login")
    }
    return next()
}


router.post("/register", 
function(req,res, next){
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
                let message = new Message(req.body.email, "Welcome To Temenos Global", 'Welcome to the temenos family', welcome(req.body.firstName) )
                transporter.sendMail(message, function(err, info){
                    if(err) console.log('an error occured sending welcome message', err.message)
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
                let message = new Message(req.body.email, "Welcome To Temenos Global", 'Welcome to the temenos family', welcome(req.body.firstName) )
                transporter.sendMail(message, function(err, info){
                    if(err) console.log('an error occured sending welcome message', err.message)
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

router.post("/account",isAuth,
 function(req,res){
    const {email, walletAddress} = req.body
    if(!email.trim()) return showError(req,"/account", "email field value cannot be empty", res)
    USER.updateOne({email : req.user.email}, {email, walletAddress}, function(err, data){
        if(err) return showError(req,"/account", "an error occured, please report this problem", res)
        return res.redirect("/account")
    })
})

router.post("/withdraw",isAuth, function(req,res){
    const {amount} = req.body
    if(!Number(amount)) return showError(req,"/withdraw", "your Withdrawal amount value was not accepted", res)
            if(req.user.fundingBallance >= Number(amount)){
                USER.updateOne({email : req.user.email}, 
                    {$inc : {fundingBallance :  - Number(amount)}},
                    function(err){
                    if(err){
                        console.log(err)
                        return showError(req,"/withdraw", "an error occured during withdrawal", res)
                    }
                    TRANSACTION.create({
                        user : req.user._id,
                        email : req.user.email,
                        title : "withdraw",
                        amount : Number(amount)
                    }).then(data=>{
                        let message = new Message(req.user.email, `You have applied for a withdrawal of ${amount}`, 
                        `Your application for a withdrawal of ${amount} has been received and will be confirmed within 24 hours`, 
                        withdrawRequest(req.user.firstName, amount))
                        transporter.sendMail(message, function(err, info){
                            if(err) console.log('an error occured sending welcome message', err.message)
                        })
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

router.post("/transfer",isAuth, function(req,res){
    let update = {}
    const {amount, to, from} = req.body
    console.log(req.body)
   if(Number(amount) && to && from){
           if(req.user[from] >= Number(amount)){
               if(req.user[from] == req.user[to]) return res.redirect("/transfer")
               update[from] = req.user[from] - Number(amount)
               update[to] = req.user[to] + Number(amount)
                USER.updateOne({email : req.user.email}, {
                    ...update,
                    $push : {activities :  {type : "transfer",from,to,amount : amount}}
                })
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
router.post("/deposit", isAuth,function(req,res){
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
                    user : req.user._id,
                    email : req.user.email,
                    title : "deposit",
                    means,
                    amount : Number(amount),
                    imageurl:  result.secure_url
                })
                  .then(()=> {
                        let message = new Message(req.user.email, 
                            `You placed Deposit of $${amount}  on your account`,
                            `Your deposit of $${amount} has been received and awaiting confirmation before being credited`,
                            depositRequest(req.user.firstName,amount)
                            )
                            transporter.sendMail(message, function(err){
                                if(err) console.log(err)
                            })
                        return showError(req,"/deposit", "succesfully uploaded, awaiting confirmation", res)
                    }).catch(err=>{
                        console.log(err)
                        return showError(req,"/deposit", "an error occured in trying to make deposit", res)
                    })
            });

      })
})

router.post("/loan", isAuth,function(req,res){
    if(Number(req.body.amount)){
        TRANSACTION.create({
            user : req.user._id,
            email : req.user.email,
            title : "loan", 
            amount : Number(req.body.amount)
        }).then(()=>{
            let message = new Message(req.user.email, 
                `Application for a loan  of $${req.body.amount}`,
                `Your Application for a loan of $${req.body.amount} has been received and awaiting confirmation`,
                loanRequest(req.user.firstName,req.body.amount)
                )
                transporter.sendMail(message, function(err){
                    if(err) console.log(err)
                })
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

router.post("/invest", isAuth, getInvestments, function(req,res){
    if(req.user[req.body.type] < Number(req.body.amount)) return showError(req,"/invest", "insufficient ballance", res)
        if(req.body.type == "shortBallance"){
            plan = res.locals.normalInvestments.filter(investment => investment.title == req.body.title )[0]
        //  check if user has a normal investment that has not been paid
                if(!plan) return showError(req,"/invest", "couldn't find your selected plan", res)
                if(Number(req.body.amount) < plan.min || Number(req.body.amount) > plan.max || !Boolean(Number(req.body.amount))) return showError(req,"/invest", `can't invest $${req.body.amount} in ${req.body.title} `, res) 
                return SHORTINVS.findOne({user : JSON.parse(JSON.stringify((req.user._id))), paid : false},
                function(err, unpaidShorts){
                    if(err)  return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
                    if(unpaidShorts)  return showError(req,"/invest", "can't invest, you have an un matured short-term investment running", res) 
                        USER.updateOne({email : req.user.email}, {
                            $inc : {shortBallance : - Number(req.body.amount)},
                        }).then(()=> {
                            SHORTINVS.create({
                                user : req.user._id,
                                title : plan.title,
                                duration : plan.duration,
                                roi : plan.roi,
                                expiry : new Date(addDays(Date.now(), plan.duration)).getTime(),
                                amount : Number(req.body.amount),
                                profit : (Number(req.body.amount) * (plan.roi/100))
                            }).then(()=>  res.redirect("/invest"))
                            .catch(err=> {
                                console.log(err.message)
                                return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
                            })
                        })
                        .catch(err=>{
                                console.log(err.message)
                                return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
                        })
                })
        }
        if(req.body.type == "cyclesBallance"){
            if(Number(req.body.amount) < res.locals.cyclesInvestment.min) return showError(req,"/invest", `can't invest $${req.body.amount} in ${res.locals.cyclesInvestment.title} `, res)
            // how do i add all credits from cycleballance to the transactions
            CYCLESINVS.findOne({user: req.user._id, active : true}, 
                function(e,d){
                            if(e) return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
                            if(d)  return showError(req,"/invest", "You already have a running cycle", res) 
                           return USER.findOneAndUpdate({_id : req.user._id}, {
                               $inc : {cyclesBallance : - Number(req.body.amount)},
                               $push : {
                                activities  : {
                                    title : "credit",
                                    from : 'cycle',
                                    amount : Number(req.body.amount),
                                }}
                            }, 
                            function(err,data){
                                if(err) return showError(req,"/invest", `error updating balance, please report this problem`, res) 
                                CYCLESINVS.create({
                                    //    this ._doc is unto prototype level
                                       ...res.locals.cyclesInvestment._doc, 
                                       pay_day : (res.locals.cyclesInvestment.roi/100) * Number(req.body.amount),
                                       accumulatedSum : Number(req.body.amount),
                                       amount_inv : Number(req.body.amount),
                                       user : data._id,
                                       email : data.email,
                                       days2run : 0,
                                       cycle : 1,
                                   }, function(e, d){
                                    if(e) return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
                                       return res.redirect('/invest')
                                   })
                            }
                            )
            })
        }
  
})

router.post('/update-existing-cycle', function(req,res){
    if(req.body['type']=='renew'){
        if(req.user.cyclesBallance < Number(req.body.amount)) return showError(req,"/invest", "insufficient ballance", res) 
        return USER.updateOne({_id : req.user._id},{
            $inc : {cyclesBallance : - Number(req.body.amount)},
            $push : {
                activities  : {
                    title : "credit",
                    from : 'cycle',
                    amount : Number(req.body.amount),
                }
            }
        } ,function(e){
            if(e) return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
           return CYCLESINVS.updateOne({_id : req.body._id},{
                $inc : {
                    accumulatedSum : req.body.amount,
                    cycle : 1,
                    days2run : -5
                }
            }, function(err){
               return res.redirect('/invest')
            })
        })
    }
    if(req.body['type']== 'cash-in'){
        return CYCLESINVS.findOne({_id : req.body._id}, function(e,d){
            if(e) return showError(req,"/invest", "an error occured on the server, please report this problem", res) 
            if(d.min_cycle_b4_with > d.cycle) return showError(req,"/invest", `your current cycle is below the minimum, ${d.min_cycle_b4_with}`, res)
            if(d.days2run < d.days_cycle) return showError(req,"/invest", `you have ${d.days_cycle - (d.days2run)} unpaid days`, res)
            return CYCLESINVS.findOneAndUpdate({_id : d._id}, {
                active : false
            }, function(er, payInvSum){
                if(er) return showError(req,"/invest", "an error occured trying to update your investment, please report this", res) 
                return USER.updateOne({_id : payInvSum.user},{
                    $inc : {cyclesBallance : payInvSum.accumulatedSum}
                }, function(e){
                    if(e) return showError(req,"/invest", "an error occured trying to update your balance, please report this", res) 
                    return res.redirect('/invest')
                })
            })
        })
    }
})

module.exports = router