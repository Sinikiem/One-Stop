import express from "express"
import authController from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { loginSchema } from "../utils/validate.js";

const route = express.Router();
route.post('/login', validate(loginSchema), authController.login);


export default route;