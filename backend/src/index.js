import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import talentRoutes from "./routes/talent.route.js"
import { printRoute } from "./middleware/configMiddleware.js";

dotenv.config(); //env configration

const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());


connectDB();  //connection to MongoDb

app.use(printRoute)

app.use("/api/talents",talentRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
