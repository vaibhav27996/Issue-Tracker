const express = require('express');
const env=require('./config/environment');
const app = express();
const port = 8001;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

        
const session = require('express-session');



const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


const path=require('path');
 
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, '/scss'),
    dest: path.join(__dirname, env.asset_path, '/css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({extended:false}));

app.use(express.static(env.asset_path));

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
