import Cart from '../models/cart.model.js';
import logger from '../utils/logger.js';

class CartService {
    async getCartByUserId(userId) {
        try {
            const cart = await Cart.findOne({ user: userId }).populate('items.car');
            return cart || new Cart({ user: userId, items: [] });
        } catch (error) {
            logger.error("Error retrieving cart: ", error);
            throw error;
        }
    }

    async addItem(userId, item) {
        try {
            const cart = await this.getCartByUserId(userId);
            const existingItemIndex = cart.items.findIndex(cartItem => cartItem.car.toString() === item.car);

            if (existingItemIndex >= 0) {
                throw new Error('Car is already in the cart.');
            }

            cart.items.push(item);
            await cart.save();
            return cart;
        } catch (error) {
            logger.error("Error adding item to cart: ", error);
            throw error;
        }
    }

    async removeItem(userId, carId) {
        try {
            const cart = await this.getCartByUserId(userId);
            cart.items = cart.items.filter(cartItem => cartItem.car._id.toString() !== carId);
            await cart.save();
            return cart;
        } catch (error) {
            logger.error("Error removing item from cart: ", error);
            throw error;
        }
    }

}

const cartService = new CartService();
export default cartService;
