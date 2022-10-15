const { default: mongoose } = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isDeleted:
    {
        type: Boolean,
        default: false
    },
    deletedAt:Date
})

module.exports = mongoose.model("user", userSchema)