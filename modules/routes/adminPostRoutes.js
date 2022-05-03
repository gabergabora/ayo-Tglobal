const express = require('express')
const { USER, TRANSACTION } = require('../userDB')
const router = express.Router()
const showError = require('../error')
const ADMIN = require('../adminDB')
const passport = require('passport')
const {transporter, Message} = require('../nodemailer')
const {depositSuccess, depositDecline} = require('../email-templates/deposit')
const {withdrawAproved,withdrawDecline} = require('../email-templates/withdraw')
const {loanDecline,loanSuccess} = require('../email-templates/loan')

router.use(express.urlencoded({extended : true}))


router.post('/login',
passport.authenticate('admin', 
{
successRedirect : 'dashboard', 
failureRedirect: 'login', 
failureFlash : true 
}))

const isAuth = function(req,res,next){
    if(req.isAuthenticated() && req.user.admin){
       return next()
    }
    return res.redirect('login')
}

router.post('/dashboard',isAuth, function(req,res){
    if(req.body.button== 'update'){
        // this is so that if no disallowed is checked, we set the disallowed to empty string
        req.body.disallowedPlans ? null : req.body.disallowedPlans = [];
        console.log(req.body)
       return USER.updateOne({email : req.body.email},req.body, 
            function(err,data){
                if(err) {
                    console.log(err)
                    return showError(req, 'dashboard', 
                    "an error occured trying to update this user", res
                    )
                }else{
                    return res.redirect("dashboard")
                }
            }    
           )
    }else if(req.body.button == 'delete'){
        return USER.deleteOne({email : req.body.email}, function(err,data){
            return showError(req, 'dashboard', 
                    `${req.body.email} deleted successfully`, res
                    )
        })
    }
    return res.redirect('dashboard')
})

router.post("/deposit",isAuth, function(req,res){
    if(req.body.button == 'confirm'){
        return TRANSACTION.updateOne({_id : req.body.id}, {
            status : 'approved',
            confirmed : true
        }, function(err){
               if(err) return res.send("an error occured trying to confirm deposits")
              return USER.findOneAndUpdate({_id : req.body.userID},{
                        $inc : {fundingBallance : Number(req.body.amount)}
                    }, function(err,  data){
                        if(err) return res.send("an error occured trying to confirm deposits")
                        // i wanted to update percentage of referrals automatically but since i saved the email of 
                        // the referred in the referree, if i use the email to find the referre here, and the referred has changed email
                        // then the refferre wont be credited and its stress to do that now.. 21/04/22
                        let message = new Message(data.email,`Your Deposit of ${req.body.amount} has been comfirmed`, 
                        `your deposit of ${req.body.amount} has been confirmed and credited into your account`,
                        depositSuccess(data.firstName, req.body.amount)
                        )
                        transporter.sendMail(message, function(err, info){
                            if(err) console.log("error occured sending email confirmation to user for deposit ",err.message )
                        })
                        return res.redirect('deposit')
                })
        })
    }
    if(req.body.button == 'decline'){
        return TRANSACTION.updateOne({_id : req.body.id}, {
            status: 'declined',
            confirmed : true
        }, function(err, data){
            if(err) return res.send('an error occured in declining the deposit')
            let message = new Message(data.email,`Your Deposit of ${req.body.amount} has been Declined`, 
            `your deposit of ${req.body.amount} has been declined`,
            depositDecline(data.firstName, req.body.amount)
            )
            transporter.sendMail(message, function(err, info){
                if(err) console.log("error occured sending email confirmation to user for deposit ",err.message )
            })
            return res.redirect('deposit')
        })
    }
    return res.send("invalid submit means")
})

router.post("/withdraw",isAuth, function(req,res){
    if(req.body.button == "decline"){
        return TRANSACTION.updateOne({_id : req.body.id}, {
            status : "declined",
            confirmed : true
        },function(err,data){
            if(err) return res.send("error occured while confirming withdrawal")
            // refund the user 
            USER.findOneAndUpdate({_id : req.body.userID}, {$inc : {fundingBallance : Number(req.body.amount)}}, 
            function(err, data){
                if(err) return res.send("error occured trying to refund user")
                let message = new Message(data.email,`Your Application for withdrawal of ${req.body.amount} `, 
                `your application for withdrawal of ${req.body.amount} from your account has been declined, contact our support for more assistance`,
                withdrawDecline(data.firstName, req.body.amount)
                )
                transporter.sendMail(message, function(err, info){
                    if(err) console.log("error occured sending email confirmation to user for deposit ",err.message )
                })
                    return res.redirect("withdraw")
                }
            )
        })
    }if(req.body.button == "confirm"){
        return TRANSACTION.findOneAndUpdate({_id : req.body.id},{
            status : "approved",
            confirmed : true
        }, function(err, data){
            if(err) return res.send("errror trying to update withdraw request")
            let message = new Message(data.email,`Your Application for withdrawal of ${req.body.amount} `, 
            `your application for withdrawal of ${req.body.amount} from your account has been approved`,
            withdrawAproved(data.firstName, req.body.amount)
            )
            transporter.sendMail(message, function(err, info){
                if(err) console.log("error occured sending email confirmation to user for deposit ",err.message )
            })
                return res.redirect("withdraw")
        })
    }
    return res.send("invalid submit means")
})

router.post('/loan',isAuth, function(req,res){
    if(req.body.button == 'confirm'){
        return TRANSACTION.updateOne({_id : req.body.id},{
            status : 'approved',
            confirmed : true
        }, function(err){
            if(err) return res.send('an error occured in approving loan request')
            USER.findOneAndUpdate({_id : req.body.userID}, {
                $inc : {fundingBallance : Number(req.body.amount)}
            }, function(err, data){
                if(err) return res.send('an error occured in updating balance of approved loan')
                let message = new Message(data.email,`Your Application for a loan of $${req.body.amount} `, 
                `your application for a loan of ${req.body.amount},has been approved and credited to your account`,
                loanSuccess(data.firstName, req.body.amount)
                )
                transporter.sendMail(message, function(err, info){
                    if(err) console.log("error occured sending email confirmation to user for deposit ",err.message )
                })
                return res.redirect('loan')
            })
        })
    }
    if(req.body.button == 'decline'){
        TRANSACTION.findOneAndUpdate({_id : req.body.id}, {
            status : 'declined', 
            confirmed : true
        }, function(err, data){
            if(err) return res.send('an error occured in declining loan request')
            let message = new Message(data.email,`Your Application for a loan of $${req.body.amount} `, 
            `your application for a loan of ${req.body.amount},was declined`,
            loanDecline(data.firstName, req.body.amount)
            )
            transporter.sendMail(message, function(err, info){
                if(err) console.log("error occured sending email confirmation to user for deposit ",err.message )
            })
            return res.redirect('loan')
        })
    }
})
// rememer to change this once you apply session
router.post('/updateplans',isAuth, function(req,res){
    if(req.body['button'] == 'delete'){
            if(req.body['type'] == 'normalInvestments'){
                return ADMIN.updateOne({username : req.user.username},{
                    $pull: {
                        normalInvestments :{title : req.body.title},
                    }
                },function(err){
                    if(err) return res.send('error occured trying to delete plans')
                    return res.redirect('updateplans')
                })
            }
            // since cycles contain just one plan, there is no delete option
    }
    if(req.body['button'] == 'add'){
        if(req.body['type'] == 'normalInvestments'){
            return ADMIN.updateOne({username : req.user.username},{
                $push : {normalInvestments : req.body}
            }, function(err){
                if(err) return res.send('error occured trying to add plans')
                return res.redirect('updateplans')
            })
        }
        // if its cycles investments
        if(req.body['type'] == 'cyclesInvestment'){
            return ADMIN.updateOne({username : req.user.username},{
                $set : { cyclesInvestment : req.body}
            }, function(err){
                if(err) return send('an error occured updating cycle plans')
                return res.redirect('updateplans')
                
            })
        }
        return 
    }
    return res.send('invalid submit value')
})

router.post('/account:function',isAuth, function(req,res){
    if(req.params.function == 'add'){
        return ADMIN.updateOne({user : req.user.username}, {
           $push : {accounts : req.body}
        }, function(err){
            if(err){
                console.log(err.message)
                return send('an erro occured trying to update account')
            }
            return res.redirect('account')
        })
    }
    if(req.params.function == 'delete'){
        return ADMIN.updateOne({user : req.user.username}, {
            $pull : {
                accounts : {address : req.body.address}
            }
        }, function(err){
            if(err){
                console.log(err.message)
                return send('an error occured trying to delete account')
            }
            return res.redirect('account')
        })
    }
    return res.send('invalid submit value')
})

module.exports = router