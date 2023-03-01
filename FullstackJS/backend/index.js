import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import veterinaryRoutes from './routes/veterinaryRoutes.js';

const app = express();

dotenv.config();

connectDB();

app.use('/api/veterinaries', veterinaryRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`)
})
