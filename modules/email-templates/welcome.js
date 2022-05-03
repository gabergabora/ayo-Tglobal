

const welcome = function(name){
    return  `
    <body>
        <div class="container px-0 my-0 mx-auto" style="padding: 0px; margin: 0 auto; max-width: 600px;">
            <header style="padding: 1rem 2rem; display: flex; justify-content: end; align-items: center;">
                <img src="https://www.temenosglobal.com/assets/images/temenos.png" alt="Temenos global logo" width="30px" style="display: inline-block;">
                <h4 style="display: inline-block;">Temenos Global</h4>
            </header>
        
            <div class="content me-3" style="text-transform: capitalize; padding-left: 1rem; max-width: 500px; margin-top: 20px;">
                <h4 style="font-weight: 400; font-size: 2rem;  color: #2f4b7a;"> Hey ${name},</h4>
                <h3 style="font-weight: 400; font-size: 2rem;  color: #2f4b7a;"> Welcome to </h3>
                <h3 style="font-weight: 400; font-size: 2rem;  color: #2f4b7a;"> Temenos Global</h3>
            </div>
            <div class="getStarted mb-4">
                <img src="https://www.temenosglobal.com/assets/email-images/welcome-GET STARTED.png" style="display: block; width: 100%;" alt="how to get started" >
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

module.exports = welcome