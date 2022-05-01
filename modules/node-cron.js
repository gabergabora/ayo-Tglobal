const cron = require('node-cron')
const { transporter, Message } = require('./nodemailer')
const {USER, SHORTINVS, CYCLESINVS} = require('./userDB')
require('dotenv').config()


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

const updateRunningCycle = async function(){
    let readyDocs = await CYCLESINVS.find({active : true, days2run : {$lte : 5}})
    for(i = 0; i <readyDocs.length; i++){
        await CYCLESINVS.updateOne({active : true, days2run : {$lte : 5}}, {
            $inc : {accumulatedSum : readyDocs[i].pay_day,days2run :  1}
        })
        await USER.updateOne({_id : readyDocs[i].user}, {
            $push : {activities :  {
                type : "credit",
                from : 'cycle',
                amount : readyDocs[i].pay_day,
            }}
        })
    }
}


// when this cron runs for two times it will pay the cycle twice X X X X
cron.schedule('0 0,1 * * *',function(e){
    // this task is to update the paid to true and increase balance of user
    updateShortPayment()
    .catch(err=>{
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
    })
})

cron.schedule('0 0 * * *', function(e){
    updateRunningCycle()
    .catch(err=>{
        let message = new Message(process.env.DEV_EMAIL,
        'URGENT!! TEMENOS GLOBAL ERROR',
        `this is an error placed by you. 
        it happened in the cron file, 
        while it was trying to update the user cycle investments dued daily`,
        `<h3>this is an error placed by you</h3>
        <h4> it happened in the cron file </h4>
        <p> while it was trying to update the user cycle investments that are due daily</p>
        <p> the error is : <span style="color: red;">${err.messsage}</span> </p>
        `
        )
        transporter.sendMail(message, function(e,d){console.log(d)})
    })
})
  // how do i add all credits from cycleballance to the transactions

