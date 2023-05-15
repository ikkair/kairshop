const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
    const options = {
        expiresIn: "1h",
        issuer: "kairshop"
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, options);
    return token
}

const generateRefreshToken = (payload) => {
    const options = {
        expiresIn: "1d",
        issuer: "kairshop"
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, options);
    return token
}

module.exports = {
    generateToken,
    generateRefreshToken
}