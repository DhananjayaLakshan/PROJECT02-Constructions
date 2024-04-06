// Import the Client model for interacting with the Client collection in the MongoDB database
const Client = require('../models/client.model')
// Import the custom error handler utility for consistent error management
const errorHandler = require('../utils/error')

// Async function to create a new client in the database
const createClient = async (req, res, next) => {
    try {
        // Extract client information from the request body
        const { name, address, projectID, phone, documents } = req.body

        // Validate mandatory fields are provided
        if (!name || !address || !projectID || !phone) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        // Instantiate a new Client with the provided details
        const newClient = await Client({
            name,
            address,
            projectID,
            phone,
            documents
        })

        // Save the new client to the database
        await newClient.save()

        // Respond with a 201 status code and success message
        res.status(201).json({ message: 'Client created' })

    } catch (error) {
        // Forward errors to the error handling middleware
        next(error)
    }
}

// Async function to retrieve clients from the database based on query parameters
const getClient = async (req, res, next) => {
    try {
        // Determine sort direction based on query parameter
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const query = {}

        // Add filters to the query if specified
        if (req.query.name) {
            query.name = req.query.name
        }
        if (req.query.clientId) {
            query._id = req.query.clientId
        }

        // Count the total number of clients for pagination or reporting
        const totalClients = await Client.countDocuments()

        // Retrieve clients based on the query and sort direction
        const client = await Client.find(query).sort({ updatedAt: sortDirection })
        // Respond with the client(s) and the total count
        res.status(200).json({ client, totalClients })

    } catch (error) {
        // Forward errors to the error handling middleware
        next(error)
    }
}

// Async function to update a client's details in the database
const updateClient = async (req, res, next) => {
    try {
        // Extract client details from the request body
        const { name, address, projectID, phone, documents } = req.body

        // Update the client identified by the ID in req.params, with the new details
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                address,
                projectID,
                phone,
                documents
            }
        }, { new: true }) // Return the updated document

        // Respond with success message and the updated client details
        res.status(200).json({ message: 'updated successfully', updatedClient })
    } catch (error) {
        // Forward errors to the error handling middleware
        next(error)
    }
}

// Async function to delete a client from the database
const deleteClient = async (req, res, next) => {
    try {
        // Delete the client identified by the ID in req.params
        await Client.findByIdAndDelete(req.params.id)

        // Respond with a success message
        res.status(200).json({ message: 'Client has been deleted' })

    } catch (error) {
        // Forward errors to the error handling middleware
        next(error)
    }
}

// Export the CRUD operation functions to be used in routing
module.exports = { createClient, getClient, updateClient, deleteClient }
