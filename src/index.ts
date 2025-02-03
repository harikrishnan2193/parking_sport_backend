import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router"; 
import sequelize from "./db/connection";

dotenv.config();

const parking = express();

// middleware
parking.use(cors());
parking.use(express.json());

parking.use(router);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((error: Error) => console.error("Unable to connect to the database:", error));

const PORT = process.env.PORT || 5000;
parking.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

parking.get("/", (req: Request, res: Response) => {
  res.send("Server running successfully and ready to accept client requests");
});

export default parking;
