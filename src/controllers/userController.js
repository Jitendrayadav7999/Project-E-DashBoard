const userModel = require("../models/userModel")
const validator = require('validator');
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const createUser = async (req, res) => {
    try {
        const user = req.body

        if (Object.keys(user).length == 0) {
            return res.status(400).send({ status: false, message: "Please Provide Required Data To Create User !!" });
        }
        let { name, email, password } = user
        if (isValid(name) === false) {
            return res.status(400).send({ status: false, message: "Enter Your Name" })
        }

        //================================== email is mandatory ===========================================
        if (!email) {
            return res.status(400).send({ status: false, message: "Email is mandatory !!" });
        }
        //================================== to check the email format ===================================
        if (!validator.isEmail(email)) {
            return res.status(400).send({ status: false, message: "Email is not valid !!" });
        }
        //================================ duplicate email =====================================================
        let checkEmail = await userModel.findOne({ email: email });
        if (checkEmail) {
            return res.status(400).send({ status: false, message: `${email} already exists !!` });
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "password is mandatory !!" });
        }
        //================ min 8 length password ===============
        if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "Please enter Minimum 8 characters or maximum 15 character, at least one uppercase letter, one lowercase letter, one number and one special character", });
        }
        let result = await userModel.create(user)
        result = result.toObject()
        delete result.password
        delete result.isDeleted
        res.status(200).send({ status: true, data: result })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }

}

const login = async (req, res) => {
    try {
        logindata = req.body
        if (Object.keys(logindata).length == 0) {
            return res.status(400).send({ status: false, message: "Please Provide Required Data login User !!" });
        }
        const { email, password } = logindata
        if (!email) {
            return res.status(400).send({ status: false, message: "Email is mandatory !!" });
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is mandatory !!" });
        }
        const user = await userModel.findOne(logindata).select("-password")
        if (user) {
            let token = jwt.sign({
                UserId:user._id.toString() 
            },process.env.secretKey, { expiresIn: '1h' });
            return res.status(200).send({ status: true, data: user,token:token })
        } else {
            return res.status(404).send({ status: false, message: "User Not Found" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = { createUser, login }