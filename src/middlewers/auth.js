const jwt = require("jsonwebtoken")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorization"]
        if (!token) { return res.status(401).send({ msg: "required token " }) }
        let splittoken = token.split(' ') //converting into array
        // decoding token  
        jwt.verify(splittoken[1], "Project-E-dashboard",
            (err, decoded) => {
                if (err) {
                    return res.status(401).send({ status: false, message: err.message });
                } else {
                    req.userId = decoded.userId;
                    next();
                }
            })
    } catch (error) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { authentication }