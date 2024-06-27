const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging purposes

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
