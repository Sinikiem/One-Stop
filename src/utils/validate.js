import Joi from 'joi';
import UserRoles from '../../config/enums/userRoles.js';

const allowedRoles = [UserRoles.USER, UserRoles.ADMIN, UserRoles.SELLER];

export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
}).min(1);

const addressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
});

const contactDetailsSchema = Joi.object({
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
});

export const sellerDetailsSchema = Joi.object({
    companyName: Joi.string().required(),
    address: addressSchema.required(),
    contactDetails: contactDetailsSchema.required(),
    // role: Joi.string().valid(...allowedRoles).required(),
});

export const updateSellerSchema = Joi.object({
    companyName: Joi.string(),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        postalCode: Joi.string(),
        country: Joi.string(),
    }),
    contactDetails: Joi.object({
      phone: Joi.string(),
      email: Joi.string().email(),
    }),
  });


export const createCarSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.string().regex(/^\d{4}$/).required(),
    price: Joi.string().regex(/^\d+(\.\d{1,2})?$/).required(),
    mileage: Joi.number().required(),
    fuelType: Joi.string(),
    transmission: Joi.string(),
    engine: Joi.string(),
    color: Joi.string().required(),
    condition: Joi.string(),
    description: Joi.string(),
    // features: Joi.array().items(Joi.string()),
    features: Joi.string(),
    sold: Joi.boolean().default(false)
});

const existingCarMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz'];

export const updateCarSchema = Joi.object({
    // seller_id: Joi.string(),
    make: Joi.string().valid(...existingCarMakes),
    model: Joi.string(),
    year: Joi.number(),
    price: Joi.number(),
    mileage: Joi.number(),
    fuelType: Joi.string(),
    transmission: Joi.string(),
    engine: Joi.string(),
    color: Joi.string(),
    condition: Joi.string(),
    description: Joi.string(),
    features: Joi.array().items(Joi.string()),
    imageIds: Joi.array().items(Joi.string()),
    sold: Joi.boolean()
}).min(1);

export const sellCarsSchema = Joi.array().items(
    Joi.object({
      carId: Joi.string().required(),
      buyerId: Joi.string().required(),
      salePrice: Joi.number().positive().required()
    })
  ); 