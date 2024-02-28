class ResponseHelper {
    static sendResponse(res, statusCode, data, message = '') {
        const response = {
            success: statusCode >= 200 && statusCode < 300,
            message,
            data,
        };
        res.status(statusCode).json(response);
    }

    static sendError(res, statusCode, message) {
        const response = {
            success: false,
            message,
        };
        res.status(statusCode).json(response);
    }
}

export default ResponseHelper;
