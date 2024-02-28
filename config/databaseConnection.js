import mongoose from 'mongoose';
import logger from '../src/utils/logger.js';
import { properties } from './properties.js';

export const connectToDatabase = () => {
    mongoose.connect(properties.CONNECTION_STRING, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    ).then(() => {
        logger.info(`Connected to DB: ${properties.CONNECTION_STRING}`)
    }).catch((error) => {
        logger.error("Unable to connect to DB" + error.message)
    })
}