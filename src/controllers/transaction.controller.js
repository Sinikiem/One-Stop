import { StatusCodes } from '../../config/statuses.js';
import ResponseHelper from '../helper/response.js';
import transactionService from '../services/transaction.service.js';
import logger from '../utils/logger.js';

class TransactionController {
    constructor() {}

    async createTransaction(data) {
        logger.info(`===> Creating Transaction`)
        try {
            const { carId, sellerId, buyerId, salePrice, carMake, carModel, carYear, buyerFirstName, buyerLastName  } = data;
            const savedTransaction = await transactionService.createTransaction({
              carId,
              carMake,
              carModel,
              carYear,
              sellerId, 
              buyerId, 
              amount: salePrice,
              buyerFirstName,
              buyerLastName,
            });

            return savedTransaction
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllTransactions(req, res) {
        try {
          const transactions = await transactionService.getAllTransactions();
          ResponseHelper.sendResponse(res, StatusCodes.OK, transactions, 'All transactions retrieved');
        } catch (error) { 
          logger.error("Error Log: ", error)
          ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error: ${error.message}`);
        }
    }

    async getTransactionByTransactionId(req, res) {
        try {
          const { transactionId } = req.params;
          const transaction = await transactionService.getTransactionById(transactionId);
          
          if (!transaction) {
            return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'Transaction not found');
          }
          
          ResponseHelper.sendResponse(res, StatusCodes.OK, transaction, 'Transaction retrieved successfully');
        } catch (error) {
          ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error: ${error.message}`);
        }
    }

    async getTransactionsBySellerId(req, res) {
      try {
        const transactions = await transactionService.getTransactionsBySellerId(req.params.sellerId);
        ResponseHelper.sendResponse(res, StatusCodes.OK, transactions, 'Transaction retrieved successfully');

      } catch (error) {
        ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error: ${error.message}`);
      }
    }
  
    async getTransactionsByBuyerId(buyerId) {
      try {
        const transactions = await Transaction.find({ buyerId });
        return transactions;
      } catch (error) {
        throw new Error(`Error fetching transactions by buyer ID: ${error.message}`);
      }
    }
}

const transactionController = new TransactionController();
export default transactionController;
