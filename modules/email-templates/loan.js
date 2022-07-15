const loanRequest = function(name,amount){
    return `
    <div class="container px-0 my-0 mx-auto" style=" max-width: 600px; margin: 0 auto ;">
    <header style=" background-color: #2f4b7a; width:100%; text-align: center; display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img src="https://www.temenosglobal.com/assets/images/temenos.png" alt="Temenos global logo" 
        style=" 
        height: 30px;
        display: inline-block;"
        >
        <h4 style="color: white;">Temenos global</h4>
    </header>

    <div class="content me-4 mb-4" style="
        margin-top: 20px;
        padding-left: 1rem;
        max-width: 400px;
    ">
    <p style="color: #2f4b7a; margin-bottom:16px; font-size:30px; text-transform: capitalize;"> Hi ${name},</p>
    <p style="color: #2f4b7a; font-weight: 400; font-size: 14px;">  Your application for a loan of $${amount}
    was placed successfully and is being processed, please wait for confirmation.
    </p>
    </div>
  
    <footer style="background-color: #2f4b7a; padding : 20px 0; display: flex; align-items: center; color: white;">
    <a href="https://temenosglobal.com"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Home </a>
    <a href="https://temenosglobal.com/about"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> About </a>
    <a href="https://temenosglobal.com/login"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Login </a>
</footer>
</div>
    `
}


const loanSuccess = function(name, amount){
    return `
    <div class="container px-0 my-0 mx-auto" style=" max-width: 600px; margin: 0 auto;">
    <header style=" background-color: #2f4b7a; width:100%; text-align: center; display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img src="https://www.temenosglobal.com/assets/images/temenos.png" alt="Temenos global logo" 
        style=" 
        height: 30px;
        display: inline-block;"
        >
        <h4 style="color: white;">Temenos global</h4>
    </header>

    <div class="content me-4 mb-4" style="
        margin-top: 20px;
        padding-left: 1rem;
        max-width: 400px;
    ">
        <p style="color: #2f4b7a; margin-bottom:16px; font-size:30px; text-transform: capitalize;"> Hi ${name},</p>
        <p style="color: #2f4b7a; font-weight: 400; font-size: 14px;"> Your application for a loan of  $${amount}
        has been approved. <strong> $${amount} </strong> has been credited to your  <a href="https://temenosglobal.com/login"> account.</a>
        </p>
    </div>
    <footer style="background-color: #2f4b7a; padding : 20px 0; display: flex; align-items: center; color: white;">
    <a href="https://temenosglobal.com"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Home </a>
    <a href="https://temenosglobal.com/about"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> About </a>
    <a href="https://temenosglobal.com/login"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Login </a>
</footer>
</div>

    `
}

const loanDecline = function(name,amount){
    return `
    
<body>
<div class="container px-0 my-0 mx-auto" style=" max-width: 600px; margin : 0 auto; ">
        <header style=" background-color: #2f4b7a; width:100%; text-align: center; display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img src="https://www.temenosglobal.com/assets/images/temenos.png" alt="Temenos global logo" 
        style=" 
        height: 30px;
        display: inline-block;"
        >
        <h4 style="color: white;">Temenos global</h4>
        </header>

    <div class="content me-4 mb-4" style="
        margin-top: 20px;
        padding-left: 1rem;
        max-width: 400px;
    ">
        <p style="color: #2f4b7a; margin-bottom:16px; font-size:30px; text-transform: capitalize;"> Hi ${name},</p>
        <p style="color: #2f4b7a; font-weight: 400; font-size: 14px;"> Your application for a loan of  $${amount}
        was declined. please contact our care support for more information about this transaction.
        </p>
    </div>
    <footer style="background-color: #2f4b7a; padding : 20px 0; display: flex; align-items: center; color: white;">
        <a href="https://temenosglobal.com"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Home </a>
        <a href="https://temenosglobal.com/about"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> About </a>
        <a href="https://temenosglobal.com/login"  style="margin: 0 1rem; display: block; color: white; text-decoration: none;"> Login </a>
    </footer>
</div>

</body>
    `
}

module.exports = {loanDecline,loanRequest,loanSuccess}

