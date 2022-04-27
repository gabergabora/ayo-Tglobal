const cron = require('node-cron')
const { transporter, Message } = require('./nodemailer')
const {USER, SHORTINVS} = require('./userDB')


const updateShortPayment = async function(){
    let readyDocs = await SHORTINVS.find({expiry : {$lt : new Date().getTime()}, paid : false})
    for(i = 0; i <readyDocs.length; i++){
        await SHORTINVS.updateOne({_id : readyDocs[i]._id}, {paid : true})
        await USER.updateOne({_id : readyDocs[i].user}, {
            $inc : {shortBallance : readyDocs[i].profit + readyDocs[i].amount}
        })
    }
}


cron.schedule('0 0,1 * * *',function(e){
    // this task is to update the paid to true and increase balance of user
    updateShortPayment()
    .catch(err=>{
        let message = new Message("azukachukwuebuka07@gmail.com",
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
},{schedule : false})


