const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser: true,  // This option tells the driver to create a new URL
        // useUnifiedTopology:true,
    }).then(() => console.log("DB connection is successfull"))
    .catch((error) => {
        console.log(error);
        console.log("DB connection failed");
        process.exit(1);
    })
}

