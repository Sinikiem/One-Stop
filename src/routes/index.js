import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import sellerRoutes from "./seller.route.js";
import carRoutes from "./car.route.js";
import carsaleRoutes from "./carsale.route.js";
import cartRoutes from "./cart.route.js";
import transactionRoutes from "./transaction.route.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/seller', sellerRoutes);
router.use('/car', carRoutes);
router.use('/carsale', carsaleRoutes);
router.use('/transaction', transactionRoutes);
router.use('/cart', cartRoutes);


export default router;
