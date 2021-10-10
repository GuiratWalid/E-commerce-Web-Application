const UserModel = require('../models/AuthenticationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const authenticationController = {

    register: async (req, res) => {
        const {
            firstName,
            lastName,
            email,
            password,
            role,
            cart
        } = req.body;
        const userExists = await UserModel.findOne({ email });
        if (!(email && password && firstName && lastName)) {
            res.status(400).send({ message: 'FirstName, lastName, email and password are required' });
            console.log('FirstName, lastName, email and password are required')
        }
        else if (password.length < 6) {
            res.json({ message: 'Password should contain at least 6 Characters !!!' });
            console.log('Password should contain at least 6 Characters !!!');
        }
        else if (userExists) {
            res.json({ message: 'Email is already used !!!' });
            console.log('Email is already used !!! ');
        }
        else {
            const passwordHash = await bcrypt.hash(password, 10);
            const user = new UserModel({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: passwordHash,
                role,
                cart
            });
            try {
                await user.save();
                const accessToken = createAccessToken({ id: user._id });
                res.json({ token: accessToken });
                console.log('User added successfully !!! ');
            } catch (err) {
                res.status(500).json({ message: 'Server Error' });
                console.log(err);
            }
        }
    },

    login: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        try {
            const userExists = await UserModel.findOne({ email });
            if (!(email && password)) {
                res.status(400).send({ message: 'Email and password are required' });
                console.log('Email and password are required')
            }
            else if (userExists && (await bcrypt.compare(password, userExists.password))) {
                const accessToken = createAccessToken({ id: userExists._id });
                res.json({ token: accessToken });
                console.log("Token : " + accessToken);
            }
            else {
                console.log(`Invalid Credentials`);
                res.status(400).send({ message: 'Invalid Credentials' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
            console.log(err);
        }
    }

};

const createAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '2h'
        }
    );
}

module.exports = authenticationController;