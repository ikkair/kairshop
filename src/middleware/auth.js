const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const authToken = (req, res, next) => {
    if (!req.headers.authorization){
         res.json({
            Message: "Server need token"
        })
    }
    const token = req.headers.authorization.split(" ")[1];
    try{
        let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.payload = decoded;
        next();
    }
    catch(err){
        console.log(err);
        if(err && err.name ==='JsonWebTokenError'){
            next(new createError(400,'Token invalid'))
        }else if(err && err.name ==='TokenExpiredError'){
            next(new createError(400,'Token expired'))
        }else{
            next(new createError(400,'Token not active'))
        }
        
    }
}

const authoCustomer = (req, res, next) => {
    if (req.payload.customer_role !== "user"){
        next(new createError(401,"Unauthorized"));
    }
    next();
}

const authoSeller = (req, res, next) => {
    if (req.payload.seller_role !== "seller"){
        next(new createError(401,"Unauthorized"));
    }
    next();
}

module.exports = {authToken, authoCustomer, authoSeller};