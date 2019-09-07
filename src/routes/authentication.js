const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup',(req,res)=>{
    res.render('./auth/signup')
    

});
/*
router.post('/signup',(req,res)=>{
    //const {password, username, fullname} = req.body
    passport.authenticate('local.signup',{
        successRedirect:'/profile',
        failureRedirect:'/singnup',
        failureFlash:true
    });    
    console.log(password, username, fullname);
    res.render('./auth/signup')
});
*/

//este bloque de codigo cumple la misma funcion del bloque comentado anteriormente
router.post('/signup', passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirect:'/singnup',
    failureFlash:true
}))

router.get('/profile',(req,res)=>{
    res.send("Todo bien")
})

router.get('/signin',(req,res)=>{
    console.log("entro");
    
    res.render('./auth/signin')

});

router.post('/signin',passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect:'/signin',
        failureFlash:true,
    })

);

module.exports = router;