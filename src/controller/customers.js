// Import models
const customerModel = require("../model/customers");

// Import success template
const succesTemplate = require("../template/template");

// Function to get all or search from database
getAllCustomers = async(req, res) => {
    // Taking query params as const
    const queryPage = Number(req.query.page)|| 1;
    const querySearch = req.query.search || "";
    const querySortBy = req.query.sortby || "customer_name";
    const querySort = req.query.sort || "ASC";
    const queryLimit = Number(req.query.limit) || 5;
    const queryOffset = (queryPage - 1) * queryLimit;

    // Error handling for query database
    try{
        // Calling selectAllCustomer method from model
        const result = await customerModel
                                .selectAllCustomer(
                                    querySearch,
                                    querySortBy,
                                    querySort,
                                    queryLimit,
                                    queryOffset
                                    );

        // Calling countCustomer method from model
        const {rows: [count]} = await customerModel.countCustomer();

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
getDetailCustomer = async(req, res) => {
    // Taking params as const
    const queryId = Number(req.params.id);

    // Error handling for query database
    try{
        // Calling selectCustomer from model and then display
        const result = await customerModel.selectCustomer(queryId);
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

// Function to create customer
createCustomer = (req, res) => {
    // Calling insertCustomer from model
    customerModel.insertCustomer(req.body)
        .then((result) => {
            // Display the result
            succesTemplate.responseTemplate(
                res, 201, result.rows, "customer created"
            );
        })
        .catch((err)=>{
            console.log(err);
            res.send(err.detail);
        });
} 

// Function to update customer
updateCustomer = (req, res) => {
    // Set param id as const
    const paramId = Number(req.params.id);
    req.body.id = paramId;
    // Calling updateCustomer method from model
    customerModel.updateCustomer(req.body)
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

// Function to delete customer
deleteCustomer = (req, res) => {
    const paramId = Number(req.params.id);
    customerModel.deleteCustomer(paramId)
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
    getAllCustomers,
    getDetailCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
}