require('dotenv').config();
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgon = require('morgan');

const userRoutes = require('./routes/user.routes');
const errMiddleware = require('./middlewares/error.middleware')


app.use(express.json());
app.use(morgon('dev'));

app.use(cors({
    origin : [process.env.FRONTEND_URL]
}));

app.use(cookieParser());

app.use('/ping', (req, res) =>{
    res.send('Pong');
});


app.use('/api/v1/user', userRoutes);

app.all('*', (req, res) =>{
    res.status(404).send('<h1 style=" width:100%; text-align:center;">OOPS!! 404 page not found</h1>');
})

app.use(errMiddleware);

module.exports = app;