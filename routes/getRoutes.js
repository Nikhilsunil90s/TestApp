const express = require('express');
const Routes = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

var users = [
        {
        email : "root@email.com",
        password: 'password'
        }
]

Routes.get("/" , (req,res,next) => {
    res.render('pages/hello');
});

Routes.get("/test-one" , (req,res,next) => {
    res.render("pages/test-one");
})

Routes.get("/test-two" , isAuthenticated, (req,res,next) => {
    res.render("pages/test-two");
})

//signin
Routes.get("/signin" , (req,res,next) => {
    res.render("pages/signin" , {
        errorMessage : ''
    })
})


Routes.post('/signin', (req,res,next)=>{
    console.log(req.body);
    const data = {
        email: req.body.email,
        password: req.body.pwd
    }


    let user =users.filter(user => (user.email === data.email) && (user.password == data.password))


    if(user.length > 0){
        req.session.isLoggedIn = true;

        req.session.save();    

        return res.redirect('/test-two')
    }
                                     
    return res.render('pages/signin',{
        errorMessage: 'User Not Found!'
    })
})


module.exports = Routes;