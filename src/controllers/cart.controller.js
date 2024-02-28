import { StatusCodes } from '../../config/statuses.js';
import ResponseHelper from '../helper/response.js';
import cartService from '../services/cart.service.js';
import logger from '../utils/logger.js';

class CartController {
    async getCart(req, res) {
        try {
            const userId = req.user._id;
            const cart = await cartService.getCartByUserId(userId);
            return ResponseHelper.sendResponse(res, StatusCodes.OK, cart, 'Cart Retrieved');
        } catch (error) {
            logger.error("Error Log: ", error);
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error retrieving cart: ${error.message}`);
        }
    }

    async addItem(req, res) {
        try {
            const userId = req.user._id;
            const { carId, priceAtTimeOfAddition } = req.body;

            const updatedCart = await cartService.addItem(userId, { car: carId, priceAtTimeOfAddition });
            return ResponseHelper.sendResponse(res, StatusCodes.OK, updatedCart, 'Item Added to Cart');
        } catch (error) {
            logger.error("Error Log: ", error);
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error adding item to cart: ${error.message}`);
        }
    }

    async removeItem(req, res) {
        try {
            const userId = req.user._id;
            const { carId } = req.params;

            const updatedCart = await cartService.removeItem(userId, carId);
            return ResponseHelper.sendResponse(res, StatusCodes.OK, updatedCart, 'Item Removed from Cart');
        } catch (error) {
            logger.error("Error Log: ", error);
            return ResponseHelper.sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error removing item from cart: ${error.message}`);
        }
    }
}

const cartController = new CartController();
export default cartController;
