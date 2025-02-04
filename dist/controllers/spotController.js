"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locationModel_1 = __importDefault(require("../models/locationModel"));
const vehicle_typeModel_1 = __importDefault(require("../models/vehicle_typeModel"));
const parking_spotModel_1 = __importDefault(require("../models/parking_spotModel"));
const ratesModel_1 = __importDefault(require("../models/ratesModel"));
const parking_recordsModel_1 = __importDefault(require("../models/parking_recordsModel"));
class SpotController {
    getAllLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield locationModel_1.default.findAll();
                res.status(200).json(locations);
            }
            catch (error) {
                console.error("Error fetching location:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getVehicleTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleType = yield vehicle_typeModel_1.default.findAll();
                res.status(200).json(vehicleType);
            }
            catch (error) {
                console.error("Error fetching vehicle types:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getSports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { selectedLocation, selectedType } = req.body;
            try {
                const availableSpots = yield parking_spotModel_1.default.findAll({
                    where: {
                        location_id: selectedLocation,
                        type_id: selectedType
                    }
                });
                res.status(200).json(availableSpots);
            }
            catch (error) {
                console.error("Error fetching spots:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getAllrates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allRates = yield ratesModel_1.default.findAll();
                res.status(200).json(allRates);
            }
            catch (error) {
                console.error("Error fetching rates:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    submitDetils(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside submitDetils controller");
            const { vehicleNumber, name, selectedSpot, selectedType, selectedLocation } = req.body;
            try {
                const newParkingRecord = yield parking_recordsModel_1.default.create({
                    vehicle_number: vehicleNumber,
                    person_name: name,
                    location_id: selectedLocation,
                    type_id: selectedType,
                    spot_id: selectedSpot,
                    parking_time: new Date(),
                    checkout_time: null
                });
                const locationData = yield locationModel_1.default.findOne({ where: { location_id: newParkingRecord.location_id } });
                const spotData = yield parking_spotModel_1.default.findOne({ where: { spot_id: newParkingRecord.spot_id } });
                res.status(200).json({
                    message: "Parking details submitted successfully",
                    data: newParkingRecord,
                    location: locationData,
                    spot: spotData
                });
            }
            catch (error) {
                console.error("Error submitting details:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getParkingDetils(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vehicleNumber } = req.body;
            console.log("Vehicle number:", vehicleNumber);
            try {
                // find parking record based on vehicle number
                const allDetils = yield parking_recordsModel_1.default.findAll({
                    where: {
                        vehicle_number: vehicleNumber
                    }
                });
                if (allDetils.length === 0) {
                    res.status(404).json({ message: "Parking record not found" });
                    return;
                }
                const parkingRecord = allDetils[0];
                //  checkout_time set as current time
                const checkoutTime = new Date();
                parkingRecord.checkout_time = checkoutTime;
                // update the record with the new checkout time
                yield parking_recordsModel_1.default.update({ checkout_time: checkoutTime }, { where: { vehicle_number: vehicleNumber } });
                // calculate the time difference - parking_time and checkout_time
                const parkingTime = new Date(parkingRecord.parking_time);
                const timeDifference = checkoutTime.getTime() - parkingTime.getTime();
                // convert to hours and round the hours
                const totalHours = Math.round(timeDifference / (1000 * 60 * 60));
                console.log(`Total time parked (in hours): ${totalHours} hours`);
                // fetch the rate structure for the vehicle type using the type_id
                const rate = yield ratesModel_1.default.findOne({
                    where: { type_id: parkingRecord.type_id }
                });
                if (!rate) {
                    res.status(404).json({ message: "Rate structure not found for the vehicle type" });
                    return;
                }
                const firstHourRate = parseFloat(rate.first_hour);
                const additionalHourRate = parseFloat(rate.additional_hour);
                let totalAmount = 0;
                if (totalHours > 1) {
                    // more than 1 hour
                    totalAmount = firstHourRate + additionalHourRate * (totalHours - 1);
                }
                else {
                    totalAmount = firstHourRate;
                }
                // round totalAmount
                totalAmount = parseFloat(totalAmount.toFixed(2));
                console.log(`Total Amount: $${totalAmount}`);
                res.status(200).json({
                    message: "Parking details retrieved successfully",
                    data: parkingRecord,
                    totalTimeInHours: totalHours.toFixed(2),
                    totalAmount: totalAmount
                });
            }
            catch (error) {
                console.error("Error fetching parking details:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getSpot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vehicleNumber } = req.body;
            try {
                const detils = yield parking_recordsModel_1.default.findOne({
                    where: {
                        vehicle_number: vehicleNumber
                    }
                });
                if (!detils) {
                    res.status(404).json({ message: "Parking record not found for this vehicle" });
                    return;
                }
                const spot = yield parking_spotModel_1.default.findOne({
                    where: {
                        spot_id: detils.spot_id
                    }
                });
                if (!spot) {
                    res.status(404).json({ message: "Parking spot not found" });
                    return;
                }
                res.status(200).json(spot);
            }
            catch (error) {
                console.error("Error fetching spot details:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = SpotController;
