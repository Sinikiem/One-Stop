import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import router from '../src/routes/index.js'
import dotenv from "dotenv"
import { connectToDatabase } from '../config/databaseConnection.js'
import morgan from 'morgan'

const app = express()
dotenv.config();
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

app.use("/api", router)

export default app
