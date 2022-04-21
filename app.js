const express = require("express")
const app = express()
const passport = require("passport")
const session = require("express-session")
const flash = require("express-flash")
const localStrategy = require("passport-local").Strategy
require("dotenv").config()

// local modules
const getUserRoute = require("./modules/routes/user_getRoute").user_getRoute
const adminRoute = require("./modules/routes/admin_getRoutes")
const {USER} = require("./modules/userDB")
const passportAuth = require("./modules/auth.js")
const userPostRoute = require("./modules/routes/userPostRoutes")
const adminPostRoute = require("./modules/routes/adminPostRoutes")

app.set("view engine", "ejs")
app.use("/assets",express.static("assets"))

app.use(flash())

// ] PASSPORT SET-UP [
passportAuth(app, session, passport, localStrategy, USER)


app.get("/", function(req,res){
    if(req.isAuthenticated()){
        res.send("you're authenticated")
    }else{
        res.send("restricted area")
    }
})

// getRoutes for user
app.use("/", getUserRoute)


// login for User

app.post('/login', 
  express.urlencoded({extended: false}),
  passport.authenticate('user', 
  {
  successRedirect : "/dashboard", 
  failureRedirect: '/login', 
  failureFlash : true 
}));


//   user post routes
app.use("/", userPostRoute)


// getRoutes admin
app.use("/admin", adminRoute)
app.use('/admin', adminPostRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("server running on port "+ PORT)
})

// forgot password
// 404 page
// 