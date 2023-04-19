const express = require('express')
const bodyParser= require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post("/form",function(req,res){
    if(
        req.body.captcha === undefined||
        req.body.captcha === ''||
        req.body.captcha === null
        ){
            return res.json({
                "success":false,
                "msg":"Please select capcha"
            })
        }
        const secretkey = process.env.SECRET_KEY;
    
        const verifyurl = `https/google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.captcha}`;

        request(verifyurl,function(err,response,body){
            body = json.parse(body);

            if(body.success !=undefined && !body.success){
                return res.json({
                    "success":false,
                    "msg":"Captcha verification failed"
                })
            }
            return res.json({
                "success":true,
                "msg":"Captcha Passed"
            })
        })
})

// app.post('/signup',function(req,res){
//     const {name, email, password}= req.body;

//     res.redirect('/')
// })
app.listen(3000,function(req,res){
    console.log("server is running on port 3000")
})