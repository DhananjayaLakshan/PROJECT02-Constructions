const express = require('express')
const { createAppointment, getAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointments.controller')
const router = express.Router()

router.post('/', createAppointment)
router.get('/', getAppointment)
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)

module.exports = router