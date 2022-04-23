
const depositRequest = function(name,amount){
    return `
    <div class="container px-0 my-0 mx-auto" style=" max-width: 600px;">
    <header style=" background-color: #2f4b7a; width:100; display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img src="https://www.temenosglobla.com/assets/images/temenos.png" alt="Temenos global logo" 
        style=" 
        height: 30px;
        display: inline-block;"
        >
        <h4 style="color: white;">Temenos global</h4>
    </header>

    <div class="content me-4 mb-4" style="
        margin-top: 20px;
        text-transform: capitalize;
        padding-left: 1rem;
        max-width: 400px;
    ">
        <h4 style="color: #2f4b7a; margin-bottom:16px; font-size:30px;"> Hey ${name},</h4>
        <h3 style="color: #2f4b7a; font-weight: 400; font-size: 32px;"> Your deposit of  <small> $${amount}</small>
            <small style="display: block;">is awaiting confirmation</small>
        </h3>
    </div>
    <div class="getStarted">
        <img src="https://www.temenosglobla.com/assets/email-images/deposit-awaiting.png" height="60%" style="display: block; margin: 0 auto; height: 60%;" alt="how to get started" >
    </div>
    <footer style="background-color: #2f4b7a; padding : 20px 0; display: flex; align-items: center; color: white;">
    <a href="https://temenosglobal.com"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Home </a>
    <a href="https://temenosglobal.com/about"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> About </a>
    <a href="https://temenosglobal.com/login"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Login </a>
    </footer>

</div>
    `
}
const depositSuccess = function(name,amount){
    return `
    <div class="container px-0 my-0 mx-auto" style=" max-width: 600px;">
    <header style=" background-color: #2f4b7a; width:100; display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img src="https://www.temenosglobla.com/assets/images/temenos.png" alt="Temenos global logo" 
        style=" 
        height: 30px;
        display: inline-block;"
        >
        <h4 style="color: white;">Temenos global</h4>
    </header>

    <div class="content me-4 mb-4" style="
        margin-top: 20px;
        text-transform: capitalize;
        padding-left: 1rem;
        max-width: 400px;
    ">
        <h4 style="color: #2f4b7a; margin-bottom:16px; font-size:30px;"> Hey ${name},</h4>
        <h3 style="color: #2f4b7a; font-weight: 400; font-size: 32px;"> Your deposit of  <small style="color : green;"> $${amount}</small>
            <small style="display: block;">has been confirmed and credited to your wallet</small>
        </h3>
    </div>
    <div class="getStarted">
        <img src="https://www.temenosglobla.com/assets/email-images/deposit-confirm.png" height="60%" style="display: block; margin: 0 auto; height: 60%;" alt="how to get started" >
    </div>
    <footer style="background-color: #2f4b7a; padding : 20px 0; display: flex; align-items: center; color: white;">
    <a href="https://temenosglobal.com"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Home </a>
    <a href="https://temenosglobal.com/about"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> About </a>
    <a href="https://temenosglobal.com/login"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Login </a>
    </footer>

</div>
    `
}

const depositDecline = function(name,amount){
    return `
    
    <div class="container px-0 my-0 mx-auto" style=" max-width: 600px;">
        <header style=" background-color: #2f4b7a; width:100; display: flex; justify-content: center; align-items: center; padding: 16px 0;">
            <img src="https://www.temenosglobla.com/assets/images/temenos.png" alt="Temenos global logo" 
            style=" 
            height: 30px;
            display: inline-block;"
            >
            <h4 style="color: white;">Temenos global</h4>
        </header>
    
        <div class="content me-4 mb-4" style="
            margin-top: 20px;
            text-transform: capitalize;
            padding-left: 1rem;
            max-width: 400px;
        ">
            <h4 style="color: #2f4b7a; margin-bottom:16px; font-size:30px;"> Hey ${name},</h4>
            <h3 style="color: #2f4b7a; font-weight: 400; font-size: 32px;"> Your deposit of  <small style="color : red;"> $${amount}</small>
                <small style="display: block;"> has been declined</small>
            </h3>
        </div>
        <div class="getStarted">
            <img src="https://www.temenosglobla.com/assets/email-images/deposit-decline.png" height="60%" style="display: block; margin: 0 auto; height: 60%;" alt="how to get started" >
        </div>
        <footer style="background-color: #2f4b7a; padding : 20px 0; display: flex; align-items: center; color: white;">
        <a href="https://temenosglobal.com"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Home </a>
        <a href="https://temenosglobal.com/about"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> About </a>
        <a href="https://temenosglobal.com/login"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Login </a>
        </footer>
    </div>
    `
}

module.exports = {depositRequest,depositDecline,depositSuccess}