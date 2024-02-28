import express from "express"
import UserRoles from "../../config/enums/userRoles.js";
import userController from "../controllers/user.controller.js";
import validate from "../middleware/validate.middleware.js";
import { signupSchema, updateUserSchema } from "../utils/validate.js"; // Assuming you have updateUserSchema
import loggedInUser from '../middleware/auth.middleware.js';

const route = express.Router();

route.post('/', validate(signupSchema), userController.signup);
route.get('/', userController.getAllUsers);

route.get(
    '/:userId', 
    loggedInUser([UserRoles.SELLER, UserRoles.USER]),
    userController.getUserById);
route.patch('/:userId', validate(updateUserSchema), userController.updateUser);
route.delete('/:userId', userController.deleteUser);

export default route;
