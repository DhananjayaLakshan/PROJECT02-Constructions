const Client = require('../models/client.model')
const errorHandler = require('../utils/error')

const createClient = async (req, res, next) => {
    try {
        const { name, address, projectID, phone, documents } = req.body

        if (!name || !address || !projectID || !phone) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        const newClient = await Client({
            name,
            address,
            projectID,
            phone,
            documents
        })

        await newClient.save()

        res.status(201).json({ message: 'Client created' })

    } catch (error) {
        next(error)
    }
}

const getClient = async (req, res, next) => {
    try {
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const query = {}

        if (req.query.name) {
            query.name = req.query.name
        }
        if (req.query.clientId) {
            query._id = req.query.clientId
        }

        const totalClients = await Client.countDocuments()

        const client = await Client.find(query).sort({ updatedAt: sortDirection })
        res.status(200).json({ client, totalClients })

    } catch (error) {
        next(error)
    }
}

const updateClient = async (req, res, next) => {
    try {
        const { name, address, projectID, phone, documents } = req.body

        const updatedClient = await Client.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                address,
                projectID,
                phone,
                documents
            }
        }, { new: true })

        res.status(200).json({ message: 'updated successfully', updatedClient })
    } catch (error) {
        next(error)
    }
}

const deleteClient = async (req, res, next) => {
    try {

        await Client.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'Client has been deleted' })

    } catch (error) {
        next(error)
    }
}

module.exports = { createClient, getClient, updateClient, deleteClient }