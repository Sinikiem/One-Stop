import userService from '../services/user.service.js';
import ResponseHelper from '../helper/response.js';
import { StatusCodes } from '../../config/statuses.js';
import sellerService from '../services/seller.service.js';
import UserRoles from '../../config/enums/userRoles.js';
import logger from '../utils/logger.js';

class SellerController {
    constructor() {}

    async createSeller(req, res) {
        logger.info("Started ==> Creating Seller")
        try {
            const { _id } = req.user;

            const user = await userService.getUserById(_id);

            if (!user || user.isDeleted) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, 'User not found');
            }

            if (user.isSeller) {
                return ResponseHelper.sendError(res, StatusCodes.BAD_REQUEST, 'User is already a seller');
            }

            user.isSeller = true;
            if(!user.roles.includes(UserRoles.SELLER)) {
                user.roles.push(UserRoles.SELLER)
            }
            user.sellerDetails = req.body;
            const updatedUser = await sellerService.create(user);

            return ResponseHelper.sendResponse(res, StatusCodes.OK, { message: 'Seller created successfully', user: updatedUser });
        } catch (error) {
            logger.error("Error Log: ", error.message)
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error creating seller: ${error.message}`);
        }
    }

    async getAllSellers(req, res) {
        let { page, limit } = req.query;
        page = page || 1;
        limit = limit || 10;
        try {
            const sellers = await sellerService.getAllSellers(page, limit);
            return ResponseHelper.sendResponse(res, StatusCodes.OK, sellers, "All sellers retrieved");
        } catch (error) {
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error fetching sellers: ${error.message}`);
        }
    }

    async getSellerById(req, res) {
        const sellerId = req.params.sellerId;
        try {
            const seller = await sellerService.getSellerById(sellerId);
            if (!seller) {
                return ResponseHelper.sendError(res, StatusCodes.NOT_FOUND, "Seller not found");
            }
            return ResponseHelper.sendResponse(res, StatusCodes.OK, seller, "Seller retrieved");
        } catch (error) {
            logger.error("Error Log: ", error.message)
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error fetching seller: ${error.message}`);
        }
    }

    async updateSeller(req, res) {
        try {
          const sellerId = req.params.sellerId;
          const updateData = req.body;
          const updatedSeller = await sellerService.updateSeller(sellerId, updateData);
    
          if (!updatedSeller) {
            return ResponseHelper.sendError(
              res,
              StatusCodes.NOT_FOUND,
              'Seller not found or has been deleted'
            );
          }
    
          return ResponseHelper.sendResponse(
            res,
            StatusCodes.OK,
            updatedSeller,
            'Seller updated successfully'
          );
        } catch (error) {
            logger.error("Error Log: ", error)
          return ResponseHelper.sendError(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error updating seller: ${error.message}`
          );
        }
      }

    async activateSeller(req, res) {
        try {
          const sellerId = req.params.sellerId;
          const updatedSeller = await sellerService.activateSeller(sellerId);
    
          return ResponseHelper.sendResponse(
            res,
            StatusCodes.OK,
            updatedSeller,
            'Seller activated successfully'
          );
        } catch (error) {
          return ResponseHelper.sendError(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error activating seller: ${error.message}`
          );
        }
      }
    
      async deactivateSeller(req, res) {
        try {
          const sellerId = req.params.sellerId;
          const updatedSeller = await sellerService.deactivateSeller(sellerId);
    
          return ResponseHelper.sendResponse(
            res,
            StatusCodes.OK,
            updatedSeller,
            'Seller deactivated successfully'
          );
        } catch (error) {
            logger.error("Error Log: ", error)
          return ResponseHelper.sendError(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error deactivating seller: ${error.message}`
          );
        }
      }
}

const sellerController = new SellerController();
export default sellerController;
