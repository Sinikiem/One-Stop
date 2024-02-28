import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    sellerId: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number },
    fuelType: { type: String },
    transmission: { type: String },
    engine: { type: String },
    color: { type: String },
    condition: { type: String },
    description: { type: String },
    features: [{ type: String }],
    imageIds: [{ type: String }],
    sold: { type: Boolean, default: false },
    salePrice: { type: Number, default: null },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }, 
});

const Car = mongoose.model('Car', carSchema);

export default Car;