import jwt from 'jsonwebtoken';
import { properties } from '../../config/properties.js';
import controller from '../controllers/auth.controller.js';
import ResponseHelper from '../helper/response.js'; // Assuming you have a status helper
import logger from '../utils/logger.js';

const loggedInUser = (roles) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return ResponseHelper.sendError(res, 401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return ResponseHelper.sendError(res, 401, 'Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, properties.JWT.JWT_SECRET);
        req.user = decoded;
        if (roles && roles.length && !roles.some((role) => req.user.roles.includes(role))) {
            return ResponseHelper.sendError(res, 403, 'Access denied. Insufficient permissions.');
        }

        next();
    } catch (ex) {
        logger.error("Error Log: ", ex)
        return ResponseHelper.sendError(res, 401, 'Unauthorized');
    }
};

export default loggedInUser;
