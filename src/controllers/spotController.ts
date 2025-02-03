import { Request, Response } from "express";
import Location from "../models/locationModel";
import VehicleType from "../models/vehicle_typeModel";
import ParkingSpot from "../models/parking_spotModel";
import Rate from "../models/ratesModel";
import ParkingRecord from "../models/parking_recordsModel";

class SpotController {
    async getAllLocation(req: Request, res: Response): Promise<void> {
        try {
            const locations = await Location.findAll();
            res.status(200).json(locations);
        } catch (error) {
            console.error("Error fetching location:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getVehicleTypes(req: Request, res: Response): Promise<void> {
        try {
            const vehicleType = await VehicleType.findAll();
            res.status(200).json(vehicleType);
        } catch (error) {
            console.error("Error fetching vehicle types:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getSports(req: Request, res: Response): Promise<void> {
        const { selectedLocation, selectedType } = req.body;

        try {
            const availableSpots = await ParkingSpot.findAll({
                where: {
                    location_id: selectedLocation,
                    type_id: selectedType
                }
            });

            res.status(200).json(availableSpots);
        } catch (error) {
            console.error("Error fetching spots:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getAllrates(req: Request, res: Response): Promise<void> {
        try {
            const allRates = await Rate.findAll();
            res.status(200).json(allRates);
        } catch (error) {
            console.error("Error fetching rates:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async submitDetils(req: Request, res: Response): Promise<void> {
        console.log("inside submitDetils controller");

        const { vehicleNumber, name, selectedSpot, selectedType, selectedLocation } = req.body;

        try {
            const newParkingRecord = await ParkingRecord.create({
                vehicle_number: vehicleNumber,
                person_name: name,
                location_id: selectedLocation,
                type_id: selectedType,
                spot_id: selectedSpot,
                parking_time: new Date(),
                checkout_time: null
            });

            const locationData = await Location.findOne({ where: { location_id: newParkingRecord.location_id } });
            const spotData = await ParkingSpot.findOne({ where: { spot_id: newParkingRecord.spot_id } });

            res.status(200).json({
                message: "Parking details submitted successfully",
                data: newParkingRecord,
                location: locationData,
                spot: spotData
            });
        } catch (error) {
            console.error("Error submitting details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getParkingDetils(req: Request, res: Response): Promise<void> {
        const { vehicleNumber } = req.body;

        console.log("Vehicle number:", vehicleNumber);

        try {
            // find parking record based on vehicle number
            const allDetils = await ParkingRecord.findAll({
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
            await ParkingRecord.update(
                { checkout_time: checkoutTime },
                { where: { vehicle_number: vehicleNumber } }
            );

            // calculate the time difference - parking_time and checkout_time
            const parkingTime = new Date(parkingRecord.parking_time);
            const timeDifference = checkoutTime.getTime() - parkingTime.getTime();

            // convert to hours and round the hours
            const totalHours = Math.round(timeDifference / (1000 * 60 * 60));
            console.log(`Total time parked (in hours): ${totalHours} hours`);

            // fetch the rate structure for the vehicle type using the type_id
            const rate = await Rate.findOne({
                where: { type_id: parkingRecord.type_id }
            });

            if (!rate) {
                res.status(404).json({ message: "Rate structure not found for the vehicle type" });
                return
            }

            const firstHourRate = parseFloat(rate.first_hour as unknown as string);
            const additionalHourRate = parseFloat(rate.additional_hour as unknown as string);

            let totalAmount = 0;

            if (totalHours > 1) {
                // more than 1 hour
                totalAmount = firstHourRate + additionalHourRate * (totalHours - 1);
            } else {
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
        } catch (error) {
            console.error("Error fetching parking details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getSpot(req: Request, res: Response): Promise<void> {
        const { vehicleNumber } = req.body;

        try {
            const detils = await ParkingRecord.findOne({
                where: {
                    vehicle_number: vehicleNumber
                }
            });

            if (!detils) {
                res.status(404).json({ message: "Parking record not found for this vehicle" });
                return
            }

            const spot = await ParkingSpot.findOne({
                where: {
                    spot_id: detils.spot_id
                }
            });

            if (!spot) {
                res.status(404).json({ message: "Parking spot not found" });
                return
            }

            res.status(200).json(spot);
        } catch (error) {
            console.error("Error fetching spot details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default SpotController;
