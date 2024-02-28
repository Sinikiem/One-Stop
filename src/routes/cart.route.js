// routes/cartRoutes.js
import express from 'express';
import UserRoles from '../../config/enums/userRoles.js';
import cartController from '../controllers/cart.controller.js';
import loggedInUser from '../middleware/auth.middleware.js';

cartController
const router = express.Router();

router.get('/',
    loggedInUser([UserRoles.USER]),
    cartController.getCart
);

router.post('/',
    loggedInUser([UserRoles.USER]),
    cartController.addItem
);

router.delete('/:carId',
    loggedInUser([UserRoles.USER]),
    cartController.removeItem
);

export default router;
