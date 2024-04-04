const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const errorHandler = require('../utils/error.js')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {

    const { userName, email, password } = req.body

    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        next(errorHandler(400, 'All feilds are required'))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save()
        res.json('Signup Successfully..!!')
    } catch (error) {
        next(error)
    }

}

const signin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'))
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found'))
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)

        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'))
        }

        const { password: pass, ...rest } = validUser._doc

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin, role: validUser.role }, process.env.JWT_SECRET)
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest)


    } catch (error) {
        next(error)
    }
}

const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json("User has been signed out")

    } catch (error) {
        next(error)
    }
}

module.exports = { signup, signin, signout }