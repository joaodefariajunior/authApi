const express = require('express');
const app = express();
const mongoose=  require('mongoose');
const dotenv=require('dotenv');
const bodyParser = require('body-parser')
const postRoute=require('./routes/posts');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },
()=>console.log('connect to mongo!!!'))

//Import Routes
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json 
app.use(bodyParser.json());
const  authRoute=require('./routes/auth');


//Route middleware

app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(3000,()=>console.log("We're on "))