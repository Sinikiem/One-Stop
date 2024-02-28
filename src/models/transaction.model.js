import mongoose from "mongoose";
import TransactionStatus from "../../config/enums/transactionStatus.js";

const transactionSchema = new mongoose.Schema({
    sellerId: { type: String, ref: 'User', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carMake: { type: String },
    carModel: { type: String },
    carYear: { type: String },
    buyerFirstName: { type: String },
    buyerLastName: { type: String},
    transactionDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    paymentMethod: { type: String },
    status: { type: String, enum: TransactionStatus, default: TransactionStatus.PENDING}
});


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;