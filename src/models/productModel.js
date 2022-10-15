const { default: mongoose } = require("mongoose")


const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
    isDeleted:
    {
        type:Boolean,
        default: false
    },
    deletedAt:Date

})

module.exports = mongoose.model("product", productSchema)