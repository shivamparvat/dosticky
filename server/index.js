const app = require('./app')
const dotenv = require('dotenv');
const database = require('./config/database');
const cloudinary = require('cloudinary');

dotenv.config({ path: "./config/config.env" });
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  });

// data base conection
database();

// servar lition
app.listen(process.env.PORT, () => console.log(`server started http://localhost:${process.env.PORT}`));
