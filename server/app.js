require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin : [process.env.FRONTEND_URL]
}));

app.use(cookieParser());

app.use('/ping', (req, res) =>{
    res.send('Pong');
});

// 3 routes config

app.all('*', (req, res) =>{
    res.status(404).send('<h1 style=" width:100%; text-align:center;">OOPS!! 404 page not found</h1>');
})

module.exports = app;