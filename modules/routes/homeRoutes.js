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

router.get('/terms-condition', function(req,res){
    res.render('terms&condition')
})

router.get('/portfolio',getInvestments, function(req,res){
    res.render('home/portfolio')
})
router.get('/how-it-works', function(req,res){
    res.render('home/how-it-works')
})

router.get('/contact', function(req,res){
    res.render('home/contact-us')
})
module.exports = router