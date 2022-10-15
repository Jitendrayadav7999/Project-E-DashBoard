const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
require("./db/dbConnection")
const route = require("./Routes/route")
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use("/", route)

app.listen(process.env.PORT || 3002, function () {
    console.log("Express app Running on port " + (process.env.PORT || 3002))
})