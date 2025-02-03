const express = require('express')
const router = new express.Router()

const spotController = require('../controller/spotController')

router.get('/park/getalllocation', spotController.getAllLocation)

router.get('/park/gettypes', spotController.getVehicleTypes)

router.post('/park/getSpot',spotController.getSports)

router.get('/park/getRates', spotController.getAllrates)

router.post('/park/submitDetils',spotController.submitDetils)

router.post('/park/parkingdetils', spotController.getParkingDetils)

router.post('/park/parkingSpotdetils',spotController.getSpot)

module.exports = router