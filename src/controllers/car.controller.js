import carService from "../services/car.service.js";
import { StatusCodes } from "../../config/statuses.js";
import ResponseHelper from "../helper/response.js";
import logger from "../utils/logger.js";
import { uploadFileToGCS } from "../middleware/storage.middleware.js";
import { request } from "express";

class CarController {

    async addNewCar(req, res) {
        try {
          const images = req.files
          req.body.sellerId = req.user._id;

          if (!req.files || req.files.length === 0) {
            return ResponseHelper.sendError(res, 'No files uploaded');
          }
    
          const fileUploadPromises = images.map(file => {
            const fileName = `cars/${Date.now()}-${file.originalname}`;
            return uploadFileToGCS(file.buffer, fileName)
          });
    
          const fileUrls = await Promise.all(fileUploadPromises);
          req.body.imageIds = fileUrls;
          req.body.features = req.body.features.split(",").forEach(item => item.trim());
          const car = await carService.addNewCar(req.body);
    
          return ResponseHelper.sendResponse(res, 200, car, 'Car Created');
        } catch (error) {
          logger.error("Error Log: ", error);
          return ResponseHelper.sendError(res, 500, `Error creating car: ${error.message}`);
        }
      }


    async getAllCars(req, res) {
        let { page, limit } = req.query;
        page = page || 1;
        limit = limit || 10;
        try {
            const cars = await carService.getAllCars(page, limit);
            return ResponseHelper.sendResponse(res, StatusCodes.OK, cars, 'All Cars Retrieved');
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving cars: ${error.message}`);
        }
    }

    async getCarById(req, res) {
        try {
            const carId = req.params.carId;
            const car = await carService.getCarById(carId);
            if (!car) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'Car not found');
            }
            return ResponseHelper.sendResponse(res, StatusCodes.OK, car, 'Car Retrieved');
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving car: ${error.message}`);
        }
    }

    async getCarsBySellerId(req, res) {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || 10;
            const sellerId = req.params.sellerId;
            const cars = await carService.getCarsBySellerId(sellerId, page, limit);
            if (!cars || cars.length === 0) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'No cars found for this seller');
            }
            return ResponseHelper.sendResponse(res, StatusCodes.OK, cars, 'Cars retrieved successfully');
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving cars: ${error.message}`);
        }
    }
    
    async updateCar(req, res) {
        try {
            const carId = req.params.carId;
            const updateData = req.body;
            const updatedCar = await carService.updateCar(carId, updateData);
            if (!updatedCar) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'Car not found');
            }
            return ResponseHelper.sendResponse(res, StatusCodes.OK, updatedCar, 'Car Updated');
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error updating car: ${error.message}`);
        }
    }

    async deleteCar(req, res) {
        try {
            const carId = req.params.carId;
            const deletedCar = await carService.deleteCar(carId);
            if (!deletedCar) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'Car not found');
            }
            return ResponseHelper.sendResponse(res, StatusCodes.OK, {}, 'Car Deleted');
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error deleting car: ${error.message}`);
        }
    }
    
    async updateCarWithSaleInfo(req, res) {
        try {
            const { carId, buyerId, salePrice } = req.body;

            const updatedCar = await carService.updateCarWithSaleInfo(carId, buyerId, salePrice);
            // await transactionService.createTransaction(carId, updatedCar.sellerId, buyerId, salePrice);

            return ResponseHelper.sendResponse(res, StatusCodes.OK, { message: 'Car sold successfully', updatedCar });
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error selling car: ${error.message}`);
        }
    }
}

const carController = new CarController();
export default carController;
