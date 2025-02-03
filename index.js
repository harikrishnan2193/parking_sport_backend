const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session');

const router = require('./router/router')


const parking = express();

parking.use(cors());
parking.use(bodyParser.json());
//sesionmiddle
parking.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  
}));

parking.use(router)


const sequelize = require('./db/connection');
sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Unable to connect to the database:', error));


const PORT = process.env.PORT || 5000;
parking.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

parking.get("/", (req, res) => {
    res.send('server running successfully and readdy to accept client reqest');
  });