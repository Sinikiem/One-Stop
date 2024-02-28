import jwt from 'jsonwebtoken'
import UserService from "../services/user.service.js";
import { properties } from '../../config/properties.js';
import { StatusCodes } from '../../config/statuses.js';
import ResponseHelper from '../helper/response.js';

class AuthController {
    constructor() {}

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.findUserByEmail(email);
    
            if (!user || user.isDeleted) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'User not found or account is deactivated');
            }
    
            if (!user.authenticate(password)) {
                return ResponseHelper.sendError(res, StatusCodes.UNAUTHORIZED, 'Password is incorrect');
            }
    
            const token = jwt.sign({ _id: user._id, roles: user.roles }, properties.JWT.JWT_SECRET, { expiresIn: properties.JWT.EXPIRES_IN });
            user.hashedPassword = undefined;
            user.salt = undefined;
    
            ResponseHelper.sendResponse(res, StatusCodes.OK, { user, token }, "Login successful")    
        } catch (error) {
            ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error from Login: ${error.message}`)
        }
    }

    async forgetPassword(email) {
        const user = await UserService.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
    
        user.resetPasswordToken = generateToken(); 
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
    
        // sendResetEmail will be implemented here
    }


}

const controller = new AuthController();

export default controller;