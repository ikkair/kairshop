// Import models
const categoryModel = require("../model/category");

// Import random id
const crypto = require("crypto");

// Import success template
const succesTemplate = require("../helper/common");

// Function to get all or search from database
const getAllCategory = async(req, res) => {
    // Taking query params as const
    const queryPage = Number(req.query.page)|| 1;
    const querySearch = req.query.search || "";
    const querySortBy = req.query.sortby || "category_type";
    const querySort = req.query.sort || "ASC";
    const queryLimit = Number(req.query.limit) || 5;
    const queryOffset = (queryPage - 1) * queryLimit;

    // Error handling for query database
    try{
        // Calling selectAllCategory method from model
        const result = await categoryModel
                                .selectAllCategory(
                                    querySearch,
                                    querySortBy,
                                    querySort,
                                    queryLimit,
                                    queryOffset
                                    );

        // Calling countCategory method from model
        const {rows: [count]} = await categoryModel.countCategory();

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
const getDetailCategory = async(req, res) => {
    // Taking params as const
    const queryId = req.params.id;

    // Error handling for query database
    try{
        // Calling selectCategory from model and then display
        const result = await categoryModel.selectCategory(queryId);
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

// Function to create category
const createCategory = (req, res) => {
    // Creating random 40 character id
    const queryId = crypto.randomBytes(20).toString("hex");
    // Calling insertCategory from model
    categoryModel.insertCategory(req.body, queryId)
        .then((result) => {
            // Display the result
            succesTemplate.responseTemplate(
                res, 201, result.rows, "category created"
            );
        })
        .catch((err)=>{
            console.log(err);
            res.send(err.detail);
        });
} 

// Function to update category 
const updateCategory = (req, res) => {
    // Set param id as const
    const paramId = req.params.id;
    req.body.id = paramId;
    // Calling updateCategory method from model
    categoryModel.updateCategory(req.body)
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

// Function to delete category
const deleteCategory = (req, res) => {
    const paramId = req.params.id;
    categoryModel.deleteCategory(paramId)
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
    getAllCategory,
    getDetailCategory,
    createCategory,
    updateCategory,
    deleteCategory
}