const express = require('express');
const morgan =require('morgan'); //middleware
const exphbs = require('express-handlebars');
const path= require('path');
const flash = require('connect-flash');//para enviar mensajes a la pagina web cuando un evento suceda
const session = require('express-session')//controla la sesiones 
const mysqlStore = require('express-mysql-session');//es usada para crear una coneccion con la base de datos
const {database} =require('./keys');
const passport = require('passport');

//inicialization
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT||4000);

app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}))

app.set('view engine','.hbs');//tener esta liena en cuenta es view no views todo puede desconfigurarce por esta lienea

//middleware
console.log(__dirname +'/public');

app.use('/',express.static('/home/jhonattan/Desktop/MegaProyectoNode/src/pubic'));// agrega el directorio estatico
app.use(session({
    secret:"JJRD",
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)//Guardando las sesciones en la base de dato
}))
//app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded( {extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




//global Variables 

app.use((req,res,next)=>{
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user;
    next();
})

//Routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public

app.use(express.static(path.join(__dirname,'public')))

//Starting of server

app.listen(app.get('port'), ()=>{
    console.log("server on port" , app.get('port'));    
})


