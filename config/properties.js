import dotenv from 'dotenv'
dotenv.config();

export const properties = {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT,
    JWT: {
        JWT_SECRET: "mysecretkey",
        EXPIRES_IN: "1d"
    },
    GCS: {
        BUCKET_NAME: process.env.BUCKET_NAME,
        PROJECT_ID: process.env.PROJECT_ID,
        KEYFILENAME: process.env.KEYFILENAME
    }
}