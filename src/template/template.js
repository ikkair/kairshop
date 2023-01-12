const paginationTemplate = (page, limit, totalData, totalPage) => {
    return {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
    };
}

const responseTemplate = (response, status, result, message, pagination) => {
    const resultPrint = {};
    resultPrint.status = "success";
    resultPrint.statusCode = status;
    resultPrint.data = result;
    resultPrint.message = message || null;
    resultPrint.pagination = pagination || {};
    response.status(status).json(resultPrint);
}

module.exports = {
    paginationTemplate,
    responseTemplate
}