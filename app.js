const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv/config");
app.use(express.json());
mongoose.connect(process.env.DB_Conn).then(()=>{
    console.log("db is connected");
}).catch((err)=>{
    console.log(err);
})

app.get('/', async(req,res)=>{
    res.send('server is runing');
})

// import routes
const userRoute = require('./routes/auth');
app.use('/api/users', userRoute);
const postsRoute = require('./routes/posts');
app.use('/api/posts', postsRoute);


app.listen(3000, ()=>{
    console.log(" server is running on 3000");
})