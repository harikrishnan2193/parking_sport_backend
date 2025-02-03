const location = require('../models/locationModel')
const vehicleTypes = require('../models/vehicle_typeModel')
const parkingSpot = require('../models/parking_spotModel')
const rates = require('../models/ratesModel')
const parkingRecords = require('../models/parking_recordsModel')


exports.getAllLocation = async (req, res) => {
    try {
        const locations = await location.findAll();

        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getVehicleTypes = async (req, res) => {
    try {
        const vehicleType = await vehicleTypes.findAll();

        res.status(200).json(vehicleType);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getSports = async (req, res) => {
    const { selectedLocation, selectedType } = req.body;

    try {
        const availableSpots = await parkingSpot.findAll({
            where: {
                location_id: selectedLocation,
                type_id: selectedType
            }
        })

        res.status(200).json(availableSpots);
    } catch (error) {
        console.error('Error fetching spots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAllrates = async (req, res) => {
    try {
        const allRates = await rates.findAll();

        res.status(200).json(allRates);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.submitDetils = async (req, res) => {
    console.log('inside submitDetils controller');

    const { vehicleNumber, name, selectedSpot, selectedType, selectedLocation } = req.body;
    console.log(vehicleNumber, name, selectedSpot, selectedType, selectedLocation);

    try {
        const newParkingRecord = await parkingRecords.create({
            vehicle_number: vehicleNumber,
            person_name: name,
            location_id: selectedLocation,
            type_id: selectedType,
            spot_id: selectedSpot,
            parking_time: new Date(),
            checkout_time: null
        });

        const locationData = await location.findOne({ where: { location_id: newParkingRecord.location_id } });
        const spotData = await parkingSpot.findOne({ where: { spot_id: newParkingRecord.spot_id } });

        res.status(200).json({
            message: 'Parking details submitted successfully',
            data: newParkingRecord,
            location: locationData,
            spot: spotData
        });
    } catch (error) {
        console.error('Error submitting details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getParkingDetils = async (req, res) => {
    const { vehicleNumber } = req.body;

    console.log('Vehicle number:', vehicleNumber);

    try {
        // find parking record based on vehicle number
        const allDetils = await parkingRecords.findAll({
            where: {
                vehicle_number: vehicleNumber
            }
        });

        if (allDetils.length === 0) {
            return res.status(404).json({ message: 'Parking record not found' });
        }

        const parkingRecord = allDetils[0];

        //  checkout_time set as current time
        const checkoutTime = new Date();
        parkingRecord.checkout_time = checkoutTime;

        // update the record with the new checkout time
        await parkingRecords.update(
            { checkout_time: checkoutTime },
            { where: { vehicle_number: vehicleNumber } }
        );

        // calculate the time difference - parking_time and checkout_time
        const parkingTime = new Date(parkingRecord.parking_time);
        const timeDifference = checkoutTime - parkingTime;

        // convert to hours
        const totalHours = timeDifference / (1000 * 60 * 60);
        console.log(`Total time parked (in hours): ${totalHours.toFixed(2)} hours`);

        // fetch the rate structure for the vehicle type using the type_id
        const rate = await rates.findOne({
            where: { type_id: parkingRecord.type_id }
        });

        if (!rate) {
            return res.status(404).json({ message: 'Rate structure not found for the vehicle type' });
        }

        const firstHourRate = parseFloat(rate.first_hour);
        const additionalHourRate = parseFloat(rate.additional_hour);

        // totalAmount 
        let totalAmount = 0;

        if (totalHours > 1) {
            // more than 1 hour
            totalAmount = firstHourRate + (additionalHourRate * (totalHours - 1));
        } else {
            totalAmount = firstHourRate;
        }

        // round totalAmount
        totalAmount = totalAmount.toFixed(2);

        console.log(`Total Amount: $${totalAmount}`);

        res.status(200).json({
            message: 'Parking details retrieved successfully',
            data: parkingRecord,
            totalTimeInHours: totalHours.toFixed(2),
            totalAmount: totalAmount
        });

    } catch (error) {
        console.error('Error fetching parking details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getSpot = async (req, res) => {
    const { vehicleNumber } = req.body;

    try {
        const detils = await parkingRecords.findOne({
            where: {
                vehicle_number: vehicleNumber
            }
        });

        if (!detils) {
            return res.status(404).json({ message: 'Parking record not found for this vehicle' });
        }

        const spot = await parkingSpot.findOne({
            where: {
                spot_id: detils.spot_id
            }
        });

        if (!spot) {
            return res.status(404).json({ message: 'Parking spot not found' });
        }

        res.status(200).json(spot);
    } catch (error) {
        console.error('Error fetching spot details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





