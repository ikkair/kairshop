// Import models
const productModel = require("../model/products");

// Import fs for delete
const fs = require("fs");

// Import redis
const redis = require("redis");
const client = redis.createClient();
client.on("error", (err) => {
    console.log(err);
});

// Import random id
const { v4: uuidv4 } = require("uuid");

// Import success template
const succesTemplate = require("../helper/common");

// Function to get all or search from database
const getAllProducts = async (req, res) => {
    // Taking query params as const
    const queryPage = Number(req.query.page) || 1;
    const querySearch = req.query.search || "";
    const querySortBy = req.query.sortby || "product_name";
    const querySort = req.query.sort || "ASC";
    const queryLimit = Number(req.query.limit) || 5;
    const queryOffset = (queryPage - 1) * queryLimit;

    // Error handling for query database
    try {
        // Calling selectAllProduct method from model
        const result = await productModel
            .selectAllProduct(
                querySearch,
                querySortBy,
                querySort,
                queryLimit,
                queryOffset
            );

        // Calling countProduct method from model
        const { rows: [count] } = await productModel.countProduct();

        // Display response
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / queryLimit);
        const pagination = succesTemplate.paginationTemplate(queryPage, queryLimit, totalData, totalPage);
        succesTemplate.responseTemplate(res, 200, result.rows, "got the data", pagination);
    }
    catch (err) {
        console.log(err);
        res.send(err.detail);
    }
}

// Function to get detail based on id
const getDetailProduct = async (req, res) => {
    // Taking params as const
    const queryId = req.params.id;

    // await client.connect();
    // if (await client.exists("hello") > 0){
    //     console.log("already exist");
    // } else {
    //     await client.set("hello", "world");
    //     await client.expire("hello", 6);
    // }
    // const test = await client.get("hello");
    // console.log(test);
    // await client.disconnect();

    // Error handling for query database
    try {
        // Calling selectProduct from model and then display
        const result = await productModel.selectProduct(queryId);
        if (result.rowCount > 0) {
            succesTemplate.responseTemplate(res, 200, result.rows, "got the data")
        } else {
            res.send("data not found");
        }
    }
    catch (err) {
        console.log(err);
        res.send(err.detail);
    }
}

// Function to create product
const createProduct = (req, res) => {
    // Creating random character id
    req.body.queryId = uuidv4();
    // Adding filename to req body
    req.body.queryFilename = req.file.filename;
    // Calling insertProduct from model
    productModel.insertProduct(req.body)
        .then((result) => {
            // Display the result
            succesTemplate.responseTemplate(
                res, 201, result.rows, "product created"
            );
        })
        .catch((err) => {
            console.log(err);
            res.send(err.detail);
        });
}

// Function to update product
const updateProduct = (req, res) => {
    // Set param id as const
    const paramId = req.params.id;
    req.body.id = paramId;
    // Calling updateProduct method from model
    productModel.updateProduct(req.body)
        .then((result) => {
            // Display the result
            if (result.rowCount > 0) {
                succesTemplate.responseTemplate(
                    res, 200, result.rows, "data updated"
                );
            } else {
                res.send("operation failed, no matching id");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send(err.detail);
        });
}

// Function to delete product
const deleteProduct = async (req, res) => {
    const paramId = req.params.id;
    productModel.selectProduct(paramId)
        .then((result) => {
            const filename = result.rows.product_filename;
            if (typeof filename !== "undefined") {
                fs.unlinkSync(__dirname + "/../uploads/" + filename)
            }
        })
        .catch((err) => {
            console.log(err);
            res.send(err.detail);
        })
    productModel.deleteProduct(paramId)
        .then((result) => {
            // Display the result
            if (result.rowCount > 0) {
                succesTemplate.responseTemplate(
                    res, 200, result.rows, "deletion success"
                );
            } else {
                res.send("operation failed, no matching id");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send(err.detail);
        })
}

// Export function to router
module.exports = {
    getAllProducts,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct
}