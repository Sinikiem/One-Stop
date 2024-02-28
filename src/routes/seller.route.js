import express from 'express';
import UserRoles from '../../config/enums/userRoles.js';
import sellerController from '../controllers/seller.controller.js';
import loggedInUser from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { sellerDetailsSchema, updateSellerSchema } from '../utils/validate.js';

const router = express.Router();

router.post('/', 
    validate(sellerDetailsSchema), 
    loggedInUser([UserRoles.USER]),
    sellerController.createSeller
)

router.get('/', 
    sellerController.getAllSellers
);

router.get('/:sellerId', 
    loggedInUser([UserRoles.USER]),
    sellerController.getSellerById
);

router.get('/:sellerId/activate', 
    sellerController.activateSeller
);

router.get('/:sellerId/deactivate', 
    sellerController.deactivateSeller
);

router.patch('/:sellerId', 
    validate(updateSellerSchema), 
    loggedInUser([UserRoles.USER]),
    sellerController.updateSeller
);

// router.delete('/:sellerId', sellerController.deleteSeller);

export default router;
