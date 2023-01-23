const app = require('./app')
const dotenv = require('dotenv');
const database = require('./config/database');

dotenv.config({ path: "./config/config.env" });

// data base conection
database();

// servar lition
app.listen(process.env.PORT, () => console.log(`server started http://localhost:${process.env.PORT}`));
