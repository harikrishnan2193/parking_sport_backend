"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./routes/router"));
const connection_1 = __importDefault(require("./db/connection"));
const swaggerConfig_1 = require("./swagger/swaggerConfig");
dotenv_1.default.config();
const parking = (0, express_1.default)();
// middleware
parking.use((0, cors_1.default)());
parking.use(express_1.default.json());
//swagger
(0, swaggerConfig_1.setupSwagger)(parking);
parking.use(router_1.default);
connection_1.default
    .authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Unable to connect to the database:", error));
const PORT = process.env.PORT || 4000;
parking.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
parking.get("/", (req, res) => {
    res.send("Server running successfully and ready to accept client requests");
});
exports.default = parking;
