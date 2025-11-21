import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import talentRoutes from "./routes/talent.route.js"
import { printRoute } from "./middleware/configMiddleware.js";

dotenv.config(); //env configration

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        // origin is allowed
        callback(null, true);
      } else {
        // origin is not allowed
        callback(new Error("CORS policy: origin not allowed"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if you use cookies/auth
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
