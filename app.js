const express = require('express')
const bodyParser= require('body-parser')
const axios = require("axios");
const e = require('express');


require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post("/form",function(req,res){
    // console.log("abcd")
    const captcha=req.body.captcha;
    // console.log(captcha)
    // console.log("abd")
    if(
        captcha === undefined||
        captcha === ''||
        captcha === null
        ){
            return res.json({
                "success":false,
                "msg":"Please select capcha"
            })
        }
        const secretkey = process.env.SECRET_KEY;
    
        const verifyurl = `https/google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${captcha}`;
        // console.log(verifyurl)
        axios.post(verifyurl,{})
        .then((response)=>{
            res.json({
                msg:"ok",
                response:response
            })
        })
        .catch((e)=>{
            res.json({
                msg:"not ok"
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