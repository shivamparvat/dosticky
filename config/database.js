const mongoose = require("mongoose");

const database = ()=> mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => console.log("database connected")).catch(err=>console.log(err));
    
module.exports = database;
