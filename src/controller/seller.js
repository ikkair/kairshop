// Import models
const sellerModel = require("../model/seller");

// Import jwt helper
const authHelper = require("../helper/auth");

// Import hash
const bcrypt = require("bcryptjs"); 

// Import random id
const {v4: uuidv4} = require("uuid");

// Import success template
const succesTemplate = require("../helper/common");

// Function to get all or search from database
const getAllSellers = async(req, res) => {
    // Taking query params as const
    const queryPage = Number(req.query.page)|| 1;
    const querySearch = req.query.search || "";
    const querySortBy = req.query.sortby || "seller_name";
    const querySort = req.query.sort || "ASC";
    const queryLimit = Number(req.query.limit) || 5;
    const queryOffset = (queryPage - 1) * queryLimit;

    // Error handling for query database
    try{
        // Calling selectAllSellers method from model
        const result = await sellerModel
                                .selectAllSellers(
                                    querySearch,
                                    querySortBy,
                                    querySort,
                                    queryLimit,
                                    queryOffset
                                    );

        // Calling countSeller method from model
        const {rows: [count]} = await sellerModel.countSeller();

        // Display response
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData/queryLimit);
        const pagination = succesTemplate.paginationTemplate(queryPage, queryLimit, totalData, totalPage);
        succesTemplate.responseTemplate(res, 200, result.rows, "got the data", pagination);
    }
    catch(err){
        console.log(err);
        res.send(err.detail);
    }
}

// Function to get detail based on id
const getDetailSeller = async(req, res) => {
    // Taking params as const
    const queryId = req.params.id;
    // Error handling for query database
    try{
        // Calling selectSeller from model and then display
        const result = await sellerModel.selectSeller(queryId);
        if (result.rowCount > 0){
            succesTemplate.responseTemplate(res , 200, result.rows, "got the data")
        } else {
            res.send("data not found");
        }
    }
    catch(err){
        console.log(err);
        res.send(err.detail);
    }
}

// Function to create seller
const registerSeller = (req, res) => {
    // Creating random character id
    req.body.queryId = uuidv4();
    // Creating hash password
    const salt = bcrypt.genSaltSync(10);
    req.body.queryPwd = bcrypt.hashSync(req.body.seller_password, salt);
    // Default role
    req.body.seller_role = "seller";
    // Calling insertSeller from model
    sellerModel.insertSeller(req.body)
        .then((result) => {
            // Display the result
            succesTemplate.responseTemplate(
                res, 201, result.rows, "seller created"
            );
        })
        .catch((err)=>{
            console.log(err);
            res.send(err.detail);
        });
} 

// Function to login 
const loginSeller = async (req, res) => {
    // Destructure request body
    const {seller_email, seller_password} = req.body
    // Search email
    let data;
    try{
        data = await sellerModel.selectEmailSeller(seller_email);
    }
    catch(err){
        console.log(err);
        res.send(err.detail);
        return
    }
    // Check is email valid
    if (data.rowCount < 1){
        return res.json({
            Message: "Email is Invalid"
        })
    }
    const user = data.rows[0];
    // Validating password hash
    const passwordValidate = bcrypt.compareSync(seller_password, user.seller_password);
    // Delete password to prevent leak
    delete user.seller_password;
    // Creating payload for auth
    let payload = {
        seller_email: user.seller_email,
        seller_role: user.seller_role
    }
    // Check is password valid
    if (passwordValidate) {
        user.seller_token = authHelper.generateToken(payload);
        user.seller_refresh_token = authHelper.generateRefreshToken(payload);
        succesTemplate.responseTemplate(
            res, 200, user, "Login Success"
        )
    } else {
        return res.json({
            Message: "Password is Invalid"
        })
    }
}

// Function to update seller
const updateSeller = (req, res) => {
    // Set param id as const
    const paramId = req.params.id;
    req.body.id = paramId;
    // Calling updateSeller method from model
    sellerModel.updateSeller(req.body)
        .then((result)=>{
            // Display the result
            if (result.rowCount > 0){
                succesTemplate.responseTemplate(
                    res, 200, result.rows, "data updated"
                    );
            } else {
                res.send("operation failed, no matching id");
            }
        })
        .catch((err)=>{
            console.log(err);
            res.send(err.detail);
        });
}

// Function to delete seller
const deleteSeller = (req, res) => {
    const paramId = req.params.id;
    sellerModel.deleteSeller(paramId)
        .then((result)=>{
            // Display the result
            if (result.rowCount > 0){
                succesTemplate.responseTemplate(
                    res, 200, result.rows, "deletion success"
                    );
            } else {
                res.send("operation failed, no matching id");
            }
        })
        .catch((err)=>{
            console.log(err);
            res.send(err.detail);
        })
}

// Export function to router
module.exports = {
    getAllSellers,
    getDetailSeller,
    registerSeller,
    updateSeller,
    deleteSeller,
    loginSeller
}