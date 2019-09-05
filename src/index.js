const express = require('express');
const morgan =require('morgan'); //middleware
const exphbs = require('express-handlebars');
const path= require('path');
//inicialization
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded( {extended: false}));
app.use(express.json());

//global Variables 

app.use((req,res,next)=>{
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