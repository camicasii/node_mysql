const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =  require('../database');
const helpers =  require('.//helpers')

//congifurar signIn
passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField: 'password', 
    passReqToCallback:true
} ,async(req,username,password,done)=>{
    
    const rows= await pool.query('SELECT * FROM users WHERE username = ?',[username]);
    
    

    if(rows.length>0){
        const user = rows[0];
        const validatePassword = await helpers.matchPassword(password, user.password);
        console.log(user);
        if(validatePassword)
        {
            console.log(user);
            
                done(null,user, req.flash('success','Welcome '+ user.username));
        }
        else{
            
            return done(null,false, req.flash('message','password incorrecto'));
        }
    }
    else{
        
        return done(null,false, req.flash('message','nombre de user no existe'));
    }
    
    
    

})
    
    )

    





//configuracion signUp
passport.use('local.signup', new LocalStrategy({
    usernameField:'username',
    passwordField: 'password', 
    passReqToCallback:true
} ,
async(req,username,password,done)=>{
    const {fullname} = req.body
    const User ={
        username,
        password,
        fullname
    }
    User.password = await helpers.encryptPassword(password)
    
    
    
    
    
    const check = await pool.query('SELECT * FROM users WHERE username = ?',User.username)       
    console.log( check.length ==0)
    if(check.length ==0){    

    const result = await pool.query('INSERT INTO users SET ?',[User])
    
    User.id=result.insertId;        
    return done(null,User);
    

    }
    else{
        
        return done(null,false, req.flash('message',` El usuario ${User.username} Ya Esta registrado intente con otro userName`));
        
        
        
    }
    } ))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser( async ( id, done ) => {    
    
  const rows = await  pool.query('SELECT * FROM users WHERE id = ?',[id]); 
  
  return done(null,rows[0]);
})


