const express = require('express')

const router = express.Router()
const {getInvestments} = require('./user_getRoute')

router.use(function(req,res,next){
    res.locals.reqUrl = req.url
    next()
})
router.get('/',getInvestments, function(req,res){
    res.render('home/index.ejs')
})

router.get('/about', function(req,res){
    res.render('home/about.ejs')
})

module.exports = router