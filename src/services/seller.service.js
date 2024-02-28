// seller.service.js
import User from "../models/users.models.js";

class SellerService {
    constructor() {}

    async create(data) {
        const seller = new User(data);
        return await seller.save();
    }

    async getSellerById(sellerId) {
        return await User.findById(sellerId);
    }

    async getAllSellers(page, limit) {
        const sellers = await User.find({ isDeleted: false, isSeller: true })
            .skip((page - 1) * limit)
            .limit(limit);
        
        return sellers;
    }

    async updateSeller(sellerId, updateData) {
      try {
        const updateQuery = {};
        for (const key in updateData) {
          updateQuery[`sellerDetails.${key}`] = updateData[key];
        }
    
        const updatedSeller = await User.findByIdAndUpdate(
          sellerId,
          { $set: updateQuery },
          { new: true }
        );
    
        return updatedSeller;
      } catch (error) {
        throw new Error(`Error updating seller: ${error.message}`);
      }
    }

    async activateSeller(sellerId) {
        try {
          const updatedSeller = await User.findByIdAndUpdate(
            sellerId,
            { 'sellerDetails.isActive': true },
            { new: true }
          );
    
          return updatedSeller;
        } catch (error) {
          throw new Error(`Error activating seller: ${error.message}`);
        }
      }
    
      async deactivateSeller(sellerId) {
        try {
          const updatedSeller = await User.findByIdAndUpdate(
            sellerId,
            { 'sellerDetails.isActive': false },
            { new: true }
          );
    
          return updatedSeller;
        } catch (error) {
          throw new Error(`Error deactivating seller: ${error.message}`);
        }
    }
}

const sellerService = new SellerService();

export default sellerService;
