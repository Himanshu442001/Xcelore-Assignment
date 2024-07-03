import express from "express"
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors"


import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"


dotenv.config({
    path:"./config/config.env"
});


const app = express();




// Middleware
app.use(cors());
app.use(express.json());




// / Connecting the Database
connectDB();


app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
});
