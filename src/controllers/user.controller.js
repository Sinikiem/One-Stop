import jwt from "jsonwebtoken";
import { properties } from "../../config/properties.js";
import { StatusCodes } from "../../config/statuses.js";
import ResponseHelper from "../helper/response.js";
import UserService from "../services/user.service.js";
import logger from "../utils/logger.js";

class UserController {
    constructor() {}

  async signup(req, res){
    try {
        const { email } = req.body;
        const existingUser = await UserService.findUserByEmail(email);

        if (existingUser && !existingUser.isDeleted) {
            return ResponseHelper.sendError(res, StatusCodes.BAD_REQUEST, 'Email already exists');
        }

        if (existingUser && existingUser.isDeleted) {
            return ResponseHelper.sendError(res, StatusCodes.BAD_REQUEST, 'User has been deactivated');
        }

        const newUser = await UserService.signup(req.body);
        newUser.hashedPassword = undefined;
        newUser.salt = undefined;
        const token = jwt.sign({ _id: newUser._id, roles: newUser.roles }, properties.JWT.JWT_SECRET, { expiresIn: properties.JWT.EXPIRES_IN });

        ResponseHelper.sendResponse(res, StatusCodes.CREATED, { newUser, token }, "User Created")
    } catch (error) {
        ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error from Signup: ${error.message}`)
    }
}

  async getUserById(req, res) {
    try {
      const userId = req.params.userId || req.user._id
       const user = await UserService.getUserById(userId);
       user.hashedPassword = undefined;
       user.salt = undefined;
       res.status(StatusCodes.OK).json({ message: 'User retrieved', user });
      } catch (error) {
        logger.error("Error Log: ", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Error from getUserById => ${error.message}` });
    }
  }

  async getAllUsers(req, res) {
    try {
      let { page, limit } = req.query;
      page = page || 1;
      limit = limit || 10;

      const data = await UserService.getAllUsers(page, limit);
      res.status(StatusCodes.OK).json({ message: 'Records retrieved', data });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Error from getAllUsers => ${error.message}` });
    }
  }

  async updateUser(req, res) {
    try {
        const userId = req.params.userId;
        const updateData = req.body;

        const updatedUser = await UserService.updateUser(userId, updateData);
        if (!updatedUser) {
            return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'User not found or has been deleted');
        }

        updatedUser.hashedPassword = undefined;
        updatedUser.salt = undefined;

        ResponseHelper.sendResponse(res, StatusCodes.OK, updatedUser, 'User updated successfully');
    } catch (error) {
        ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error from updateUser => ${error.message}`);
    }
}

  async deleteUser(req, res) {
    try {
        const userId = req.params.userId;

        const user = await UserService.deleteUser(userId);
        if (!user) {
            return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'User not found');
        }

        ResponseHelper.sendResponse(res, StatusCodes.OK, {}, 'User deleted successfully');
    } catch (error) {
        ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error from deleteUser => ${error.message}`);
    }
  }

}

const userController = new UserController();

export default userController