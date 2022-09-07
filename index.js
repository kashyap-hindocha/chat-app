const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('public/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
    })
}

mongoose.connect(process.env.MONGO_URL, {
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