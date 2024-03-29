const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

let MONGO_URL = process.env.MONGO_URL;

//connect to the database
mongoose.connect(MONGO_URL , 
  {
    usenewurlparser: true,
    useunifiedtopology: true
  }).then(()=>{
    console.log(`connection successful `);
  }).catch((err)=>{
    console.log(`error connecting to database` , err);
  })





// mongoose.connect(`mongodb://localhost/issue_tracker`);



// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;