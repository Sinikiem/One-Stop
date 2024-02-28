import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const sellerSchema = new mongoose.Schema({
    seller_id: { type: String, default: uuidv4, unique: true },
    user_id: { type: String, ref: 'User', required: true },
    company_name: { type: String },
    seller_info: {
        address: { type: String },
        phone_number: { type: String },
        email: { type: String }
    },
    created_at: { type: Date, default: Date.now },
    inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    isActive: { type: Boolean, default: false},
    isDeleted: { type: Boolean, default: false}
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;