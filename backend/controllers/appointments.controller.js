const Appointment = require('../models/appointments.model')
const errorHandler = require('../utils/error')

const createAppointment = async (req, res, next) => {

    try {
        const { fullName, email, phone, companyName, date, time, message, userId } = req.body

        if (!fullName || !email || !phone || !companyName || !date || !time || !userId) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        const newAppointment = await Appointment({
            fullName,
            email,
            phone,
            companyName,
            date,
            time,
            message,
            userId

        })

        const savedAppointment = await newAppointment.save()

        res.status(201).json({ message: 'package created', savedAppointment })

    } catch (error) {
        next(error)
    }
}

const getAppointment = async (req, res, next) => {

    try {
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const query = {}

        if (req.query.fullName) {
            query.fullName = req.query.fullName
        }

        if (req.query.appointmentId) {
            query._id = req.query.appointmentId
        }

        if (req.query.userId) {
            query.userId = req.query.userId
        }

        const totalAppointments = await Appointment.countDocuments()

        const appointment = await Appointment.find(query).sort({ updatedAt: sortDirection })
        res.status(200).json({ appointment, totalAppointments })

    } catch (error) {
        next(error)
    }

}

const updateAppointment = async (req, res, next) => {

    try {
        const { fullName, email, phone, companyName, date, time, message, status } = req.body


        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, {
            $set: {
                fullName,
                email,
                phone,
                companyName,
                date,
                time,
                message,
                status
            }
        }, { new: true })

        res.status(200).json({ message: 'updated successfully', updatedAppointment })
    } catch (error) {
        next(error)
    }

}

const deleteAppointment = async (req, res, next) => {

    try {

        await Appointment.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'Appointment has been deleted' })

    } catch (error) {
        next(error)
    }

}

module.exports = { createAppointment, getAppointment, updateAppointment, deleteAppointment }