// Import models
const categoryModel = require("../model/category");

// Import success template
const succesTemplate = require("../template/template");

// Function to get all or search from database
getAllCategory = async(req, res) => {
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
getDetailCategory = async(req, res) => {
    // Taking params as const
    const queryId = Number(req.params.id);

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
createCategory = (req, res) => {
    // Calling insertCategory from model
    categoryModel.insertCategory(req.body)
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
updateCategory = (req, res) => {
    // Set param id as const
    const paramId = Number(req.params.id);
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
deleteCategory = (req, res) => {
    const paramId = Number(req.params.id);
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
    createCategory,
    updateCategory,
    deleteCategory
}