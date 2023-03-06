const mongoose = require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

// mongoose.connect(`${process.env.MONGO_URl}`, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
//     console.log("mongodb is connected");
// });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;