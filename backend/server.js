const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');


console.log('$$$moment ', moment('2019-10-10T19:46:28.290Z').fromNow());

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
const uri = 'mongodb+srv://pat:B0MWBf2VvG6NKmxo@cluster0-jrqle.mongodb.net/test?retryWrites=true&w=majority';
console.log('uri ', uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } );

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

