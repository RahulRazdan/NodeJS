
module.exports = function (error,request,response,next) {
    response.status(500).send(error.message);
}