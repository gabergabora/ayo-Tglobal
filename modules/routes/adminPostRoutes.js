const express = require('express')
const { USER } = require('../userDB')
const router = express.Router()
const showError = require('../error')

router.use(express.urlencoded({extended : true}))

router.post('/dashboard', function(req,res){
    if(req.body.button== 'update'){
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

router.post("/deposit", function(req,res){
    console.log(req.body)
})
router.post("/withdraw", function(req,res){
    console.log(req.body)
    if(req.body.button == "decline"){
        USER.updateOne({'transactions._id': req.body.id},{
            "transactions.$.confirmed" : true,    
            "transactions.$.status" : 'declined',  
            $inc : {fundingBallance : Number(req.body.amount)},
        }, function(err, data){
            if(err){
                console.log(err)
                return showError(req, 'withdraw', "an error occured trying to update withdrawal value", res)
            }
            return res.redirect('withdraw')
        })
        // USER.findOne({'investments.id' : req.body.id})
        // .then(dat=> console.log(dat))
        // .catch(err=> console.log(err))
    }
})
// do test the delete feature

module.exports = router