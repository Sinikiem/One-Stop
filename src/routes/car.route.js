import express from 'express';
import validate from '../middleware/validate.middleware.js';
import carController from '../controllers/car.controller.js'; // Replace with the path to your car controller
import UserRoles from '../../config/enums/userRoles.js';
import { createCarSchema, updateCarSchema } from '../utils/validate.js';
import loggedInUser from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();
router.post('/', 
    loggedInUser([UserRoles.SELLER]),
    upload.array('image'),
    validate(createCarSchema),
    carController.addNewCar
);

router.get('/', carController.getAllCars);
router.get('/:carId', carController.getCarById);
router.get('/seller/:sellerId', carController.getCarsBySellerId);
router.patch('/:carId', validate(updateCarSchema), carController.updateCar);
router.delete('/:car_id', carController.deleteCar);

export default router;
