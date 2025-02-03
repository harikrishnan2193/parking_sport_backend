import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router"; 
import sequelize from "./db/connection";

// Load environment variables
dotenv.config();

const parking = express();

// Middleware
parking.use(cors());
parking.use(express.json()); // bodyParser is now built-in

// Routes
parking.use(router);

// Database Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((error: Error) => console.error("Unable to connect to the database:", error));

// Server Port
const PORT = process.env.PORT || 5000;
parking.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Root Route
parking.get("/", (req: Request, res: Response) => {
  res.send("Server running successfully and ready to accept client requests");
});

export default parking;
