const errorLogger = (error, request, response, next) => {
    console.error(error.message, error.stack);
    next(error);
};

const errorResponder = (error, request, response, next) => {
    const status = error.statusCode || 500;
    response.status(status).json({ message: error.message });
};

module.exports = {
    errorLogger,
    errorResponder,
};
