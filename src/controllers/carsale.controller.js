import carService from "../services/car.service.js";
import { StatusCodes } from "../../config/statuses.js";
import ResponseHelper from "../helper/response.js";
import logger from "../utils/logger.js";
import transactionController from "./transaction.controller.js";
import userService from "../services/user.service.js";

class CarSaleController {   
    async sellCars(req, res) {
        const carSaleData = req.body;
        try {
            const salePromises = carSaleData.map(
                async ({ carId, buyerId, salePrice }) => {
                const buyerInfo = await userService.getUserById(buyerId);
                const updatedCar = await carService.updateCarWithSaleInfo(carId, buyerId, salePrice);
                if (!updatedCar) {
                    throw new Error(`Unable to update Car with ID: ${carId}`);
                }
                const transaction = await transactionController.createTransaction({
                    carId, 
                    carMake: updatedCar.make,
                    carModel: updatedCar.model,
                    carYear: updatedCar.year,
                    sellerId: updatedCar.sellerId, 
                    buyerId, 
                    salePrice,
                    buyerFirstName: buyerInfo.firstName,
                    buyerLastName: buyerInfo.lastName,
                });
                return { updatedCar, transaction };
            });

            const results = await Promise.all(salePromises);

            return ResponseHelper.sendResponse(res, StatusCodes.OK, { results }, "Cars sold successfully");
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error from sellCars => ${error.message}`);
        }
    }

    async getTransactionsBySellerId(req, res) {
        try {
          const { sellerId } = req.params;
          const transactions = await transactionService.getTransactionsBySellerId(sellerId);
          return ResponseHelper.sendResponse(res, StatusCodes.OK, transactions, 'Transactions by seller ID retrieved successfully');
        } catch (error) {
          return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error fetching transactions by seller ID: ${error.message}`);
        }
      }
    
      async getTransactionsByBuyerId(req, res) {
        try {
          const { buyerId } = req.params;
          const transactions = await transactionService.getTransactionsByBuyerId(buyerId);
          return ResponseHelper.sendResponse(res, StatusCodes.OK, transactions, 'Transactions by buyer ID retrieved successfully');
        } catch (error) {
          return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error fetching transactions by buyer ID: ${error.message}`);
        }
      }
}

const carSaleController = new CarSaleController();
export default carSaleController;
