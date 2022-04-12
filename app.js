const express = require("express")
const app = express()


// local modules
const getUserRoute = require("./modules/user_getRoute")

app.set("view engine", "ejs")
app.use("/assets",express.static("assets"))


// getRoutes for user
app.use("/", getUserRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("server running on port "+ PORT)
})


// forgot password
// 404 page
// 