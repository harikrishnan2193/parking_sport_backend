import express from "express";
import SpotController from "../controllers/spotController";

const router = express.Router();
const spotController = new SpotController();


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


/**
 * @swagger
 * /park/getRates:
 *   get:
 *     summary: Get parking rates
 *     description: Fetches the parking rate structure for different vehicle types.
 *     responses:
 *       200:
 *         description: List of rates retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/park/getRates", spotController.getAllrates);

/**
 * @swagger
 * /park/submitDetils:
 *   post:
 *     summary: Submit parking details
 *     description: Stores parking information for a vehicle when it enters the parking lot.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleNumber:
 *                 type: string
 *                 example: "KL-07-AB-1234"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               selectedSpot:
 *                 type: number
 *                 example: 5
 *               selectedType:
 *                 type: number
 *                 example: 2
 *               selectedLocation:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Parking details submitted successfully.
 *       500:
 *         description: Internal server error.
 */
router.post("/park/submitDetils", spotController.submitDetils);


/**
 * @swagger
 * /park/parkingdetils:
 *   post:
 *     summary: Get parking details
 *     description: Retrieves parking record and calculates total parking time and cost.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleNumber:
 *                 type: string
 *                 example: "KL-07-AB-1234"
 *     responses:
 *       200:
 *         description: Parking details retrieved successfully.
 *       404:
 *         description: Parking record not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/park/parkingdetils", spotController.getParkingDetils);

/**
 * @swagger
 * /park/parkingSpotdetils:
 *   post:
 *     summary: Get parking spot details
 *     description: Retrieves details about the specific parking spot where a vehicle is parked.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleNumber:
 *                 type: string
 *                 example: "KL-07-AB-1234"
 *     responses:
 *       200:
 *         description: Parking spot details retrieved successfully.
 *       404:
 *         description: Parking spot not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/park/parkingSpotdetils", spotController.getSpot);

export default router;
