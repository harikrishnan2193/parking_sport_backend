"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotController_1 = __importDefault(require("../controllers/spotController"));
const router = express_1.default.Router();
const spotController = new spotController_1.default();
/**
 * @swagger
 * /park/getalllocation:
 *   get:
 *     summary: Retrieve all locations
 *     description: Fetches all parking locations from the database.
 *     responses:
 *       200:
 *         description: List of locations retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/park/getalllocation", spotController.getAllLocation);
/**
 * @swagger
 * /park/gettypes:
 *   get:
 *     summary: Retrieve all vehicle types
 *     description: Fetches all vehicle types available in the parking system.
 *     responses:
 *       200:
 *         description: List of vehicle types retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/park/gettypes", spotController.getVehicleTypes);
/**
 * @swagger
 * /park/getSpot:
 *   post:
 *     summary: Get available parking spots
 *     description: Retrieves available parking spots based on location and vehicle type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedLocation:
 *                 type: number
 *               selectedType:
 *                 type: number
 *     responses:
 *       200:
 *         description: Available parking spots retrieved.
 *       500:
 *         description: Internal server error.
 */
router.post("/park/getSpot", spotController.getSports);
router.get("/park/getRates", spotController.getAllrates);
router.post("/park/submitDetils", spotController.submitDetils);
router.post("/park/parkingdetils", spotController.getParkingDetils);
router.post("/park/parkingSpotdetils", spotController.getSpot);
exports.default = router;
