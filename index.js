const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const path = require('path');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use("localhost:49341/api/auth", userRoutes);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('public/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
    })
}

const mongoURL = () => {
    if(proccess.env.ENVIRONMENT === 'local'){
        return process.env.MONGO_URL;
    }else if(process.env.ENVIRONMENT === 'production'){
        return process.env.HEROKU_MONGO_URL;
    }
};

mongoose.connect(process.env.HEROKU_MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=> {
    console.log('DB connection successfully');
}).catch((err)=> {
    console.log(err.message);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=> {
    console.log(`server started on port ${process.env.PORT}`);
})