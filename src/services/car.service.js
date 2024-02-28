import Car from "../models/car.model.js";

class CarService {
    async addNewCar(carData) {
        return await Car.create(carData);
    }

    async getAllCars(page, limit) {
        return await Car.find()
        .skip((page - 1) * limit)
        .limit(limit);
    }

    async getCarsBySellerId(sellerId, page, limit) {
        return await Car.find({sellerId})
        .skip((page - 1) * limit)
        .limit(limit);
    }

    async getCarById(carId) {
        return await Car.findById(carId);
    }

    async updateCar(carId, updateData) {
        return await Car.findByIdAndUpdate(carId, updateData, { new: true });
    }

    async deleteCar(carId) {
        return await Car.findByIdAndDelete(carId);
    }
    
    async updateCarWithSaleInfo(carId, buyerId, salePrice) {
        try {
            const car = await Car.findById(carId);
            if (!car) {
                throw new Error('Car not found');
            }

            if (car.sold) {
                throw new Error('Car has already been sold');
            }

            car.sold = true;
            car.buyerId = buyerId;
            car.salePrice = salePrice;
            const updatedCar = await car.save();

            return updatedCar;
        } catch (error) {
            throw new Error(`Error selling car: ${error.message}`);
        }
    }
}

const carService = new CarService();
export default carService;
