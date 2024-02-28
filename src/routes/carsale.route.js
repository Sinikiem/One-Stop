import express from 'express';
import validate from '../middleware/validate.middleware.js';
import carsaleController from '../controllers/carsale.controller.js'; // Replace with the path to your car controller
import UserRoles from '../../config/enums/userRoles.js';
import { sellCarsSchema } from '../utils/validate.js';
import loggedInUser from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/', 
    validate(sellCarsSchema),
    loggedInUser([UserRoles.SELLER]),
    carsaleController.sellCars
);

// router.get('/', carController.getAllCars);
// router.get('/:carId', carController.getCarById);
// router.patch('/:carId', validate(updateCarSchema), carController.updateCar);
// router.delete('/:car_id', carController.deleteCar);

export default router;
