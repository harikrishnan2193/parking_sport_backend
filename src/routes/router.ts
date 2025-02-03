import express from "express";
import SpotController from "../controllers/spotController";

const router = express.Router();
const spotController = new SpotController();

router.get("/park/getalllocation", spotController.getAllLocation);

router.get("/park/gettypes", spotController.getVehicleTypes);

router.post("/park/getSpot", spotController.getSports);

router.get("/park/getRates", spotController.getAllrates);

router.post("/park/submitDetils", spotController.submitDetils);

router.post("/park/parkingdetils", spotController.getParkingDetils);

router.post("/park/parkingSpotdetils", spotController.getSpot);

export default router;
