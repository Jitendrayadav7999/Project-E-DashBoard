const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.DbUrl, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is Connected"))
    .catch(error => console.log(error))

