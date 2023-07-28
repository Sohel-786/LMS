import app  from './app.js';

import connect from './config/db.js';

import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:  process.env.CLOUDINARY_API_SECRET,
    api_key : process.env.CLOUDINARY_API_KEY
})

app.listen(process.env.PORT, () =>{
    connect();
    console.log(`Listening on ${process.env.PORT}`)
})