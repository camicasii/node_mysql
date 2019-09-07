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
            
                done(null,user, req.flash('success','Welcome'+ user.username));
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
    const result = await pool.query('INSERT INTO users SET ?',[User])
   { /**console.log(result);
     * OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 9,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0
}*/}
    
    User.id=result.insertId;    
    
    return done(null,User);
    

}   )   )

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser( async ( id, done ) => {    
    
  const rows = await  pool.query('SELECT * FROM users WHERE id = ?',[id]); 
  
  return done(null,rows[0]);
})


