const express = require("express")
const app = express()


// local modules
const getUserRoute = require("./modules/routes/user_getRoute")
const adminRoute = require("./modules/routes/admin_getRoutes")

app.set("view engine", "ejs")
app.use("/assets",express.static("assets"))


// getRoutes for user
app.use("/", getUserRoute)

// getRoutes admin
app.use("/admin", adminRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("server running on port "+ PORT)
})


// forgot password
// 404 page
// 