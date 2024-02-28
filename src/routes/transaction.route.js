import express from 'express';
import transactionController from '../controllers/transaction.controller.js';

const router = express.Router();

router.get('/', transactionController.getAllTransactions);
router.get('/:transactionId', transactionController.getTransactionByTransactionId);
router.get('/seller/:sellerId', transactionController.getTransactionsBySellerId);
// router.get('/buyer/:buyerId', transactionController.getTransactionsByBuyerId);
// router.get('/car/make/:make', transactionController.getTransactionsByCarMake);
// router.get('/:transactionId', transactionController.getTransactionById);
// router.post('/', transactionController.createTransaction);
// router.delete('/:transactionId', transactionController.deleteTransaction);

export default router;
