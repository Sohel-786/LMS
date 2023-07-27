const app = require('./app.js');

const connect = require('./config/db.js');

app.listen(process.env.PORT, () =>{
    connect();
    console.log(`Listening on ${process.env.PORT}`)
})