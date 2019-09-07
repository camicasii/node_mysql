const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =  require('../database');
const helpers =  require('.//helpers')


//configuracion
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
    console.log( result);
    
    return done(null,User);
    

}   )   )

passport.serializeUser((user,done)=>{
    console.log(user);
    
    done(null,user.id);
})

passport.deserializeUser( async ( id, done ) => {
    console.log("paso");
    
  const rows = await  pool.query('SELECT * FROM users WHERE id = ?',[id]);
  console.log(rows[0]);
  
  done(null,rows[0]);
})


