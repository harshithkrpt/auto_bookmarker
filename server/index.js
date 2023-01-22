// Import External Dependancies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUI = require("swagger-ui-express");
const cors = require('cors');
const docs = require('./docs');

// Import Internal Files
const routes = require('./routes/routes');

const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',routes);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(err) => {
    console.log(err);
});

database.once('connected',() => {
    console.log('Database Connected');
})

const PORT = 4000;
app.listen(PORT,() => {
    console.log("Server Started at Port : " + PORT);
});