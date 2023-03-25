require('dotenv').config();
const express = require('express');
const db = require('./config/mongoose');
const port = process.env.PORT || 3000;
const app = express();

const expressLayouts = require('express-ejs-layouts');


        
const session = require('express-session');

const flash = require('connect-flash');
const customMware = require('./config/middleware');


const path=require('path');
 
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  


app.use(express.urlencoded({extended:false}));

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(flash());
app.use(customMware.setflash);

// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`) ;
});
