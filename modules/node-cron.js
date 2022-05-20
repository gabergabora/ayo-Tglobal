// const cron = require('node-cron')
// const { transporter, Message } = require('./nodemailer')
const {USER, SHORTINVS, CYCLESINVS} = require('./userDB')
// require('dotenv').config()

const ADMIN = require("./adminDB")


/*
    (-NOTED-)
HEROKU APPS GO TO SLEEP AFTER 30 MINS OF INACTIVITY, THIS IS TO PRESERVE THEIR 
THIS IS TO PRESERVE THEIR 550 DYNO HOURS GIVEN TO FREE TIER, WHEN THE HEROKU APP
SLEEPS, THE CRON-JO FUNCTION WOULD NOT RUN, AN EASY WAY WOULD BE TO HAVE AN APP SOMEWHERE
THAT AT INTERVALS IT RUNS A GET REQUEST TO MY SITE BUT THAT WOULD ALSO WASTE THE DYNO HOURS
    (-----)
*/
const updateShortPayment = async function(){
    let readyDocs = await SHORTINVS.find({expiry : {$lt : new Date().getTime()}, paid : false})
    for(i = 0; i <readyDocs.length; i++){
        await SHORTINVS.updateOne({_id : readyDocs[i]._id}, {paid : true})
        await USER.updateOne({_id : readyDocs[i].user}, {
            $inc : {shortBallance : readyDocs[i].profit + readyDocs[i].amount},
            $push : {activities :  {
                type : "credit",
                from : readyDocs[i].title,
                amount : readyDocs[i].profit + readyDocs[i].amount,
            }}
        })
    }
}

const updateRunningCycle = async function(req){
    let readyDocs = await CYCLESINVS.find({active : true, days2run : {$lt : 5}})
    for(i = 0; i <readyDocs.length; i++){
        await CYCLESINVS.updateOne({_id :readyDocs[i]._id}, {
            $inc : {accumulatedSum : readyDocs[i].pay_day, days2run :  1}
        })
        await USER.updateOne({_id : readyDocs[i].user}, {
            $push : {activities :  {
                type : "credit",
                from : 'cycle',
                amount : readyDocs[i].pay_day,
            }}
        })
    }
    await ADMIN.updateOne({username : req.user.username}, {lastCyclesPayday : Date()})
}
/*

let Task = cron.schedule('0 0 0 * * *',function(e){
    try {
        updateShortPayment()
        updateRunningCycle()
    }
    catch(err){
        let message = new Message(process.env.DEV_EMAIL,
        'URGENT!! TEMENOS GLOBAL ERROR',
        `this is an error placed by you. 
        it happened in the cron file, 
        while it was trying to update the user investments that are due`,
        `<h3>this is an error placed by you</h3>
        <h4> it happened in the cron file </h4>
        <p> while it was trying to update the user investments that are due</p>
        <p> the error is : <span style="color: red;">${err.messsage}</span> </p>
        `
        )
        transporter.sendMail(message, function(e,d){console.log(d)})
    }
},{
  scheduled: true
})

Task.start()
*/

module.exports = {updateShortPayment, updateRunningCycle}
