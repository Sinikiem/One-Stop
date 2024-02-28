// transaction.service.js
import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";

class TransactionService {
    async createTransaction(data) {
        return await Transaction.create(data);
    }

    async getTransactionById(transactionId) {
        try {
          const transaction = await Transaction.findById(transactionId);
          return transaction;
        } catch (error) {
          throw new Error(`Error fetching transaction by ID: ${error.message}`);
        }
    }

    async getAllTransactions(page, limit) {
        try {
          const transactions = await Transaction.find()
          .skip((page - 1) * limit)
          .limit(limit);
          return transactions;
        } catch (error) {
          throw new Error(`Error: ${error.message}`);
        }
    }

    async getTransactionsBySellerId(sellerId) {
      const transactions = await Transaction.find({ sellerId: new mongoose.Types.ObjectId(sellerId) });
      return transactions;
    }
  
    async getTransactionsByBuyerId(buyerId) {
      try {
        const transactions = await Transaction.find({ buyerId });
        return transactions;
      } catch (error) {
        throw new Error(`Error fetching transactions by buyer ID: ${error.message}`);
      }
    }

    async updateTransaction(transactionId, updateData) {
        // Implement method to update a transaction
    }

    async deleteTransaction(transactionId) {
        // Implement method to delete a transaction
    }
}

const transactionService = new TransactionService();

export default transactionService;
