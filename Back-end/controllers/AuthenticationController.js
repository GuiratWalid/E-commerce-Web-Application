const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config({ path: '.env' });

const authenticationController = {

    register: async (req, res) => {
        const {
            firstName,
            lastName,
            email,
            password,
            role
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
                role
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
                res.json({ token: accessToken, role: userExists.role });
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
    },

    forgotPassword: async (req, res) => {

        const email = req.body.email;
        const userExists = await UserModel.findOne({ email });

        if (!(email)) {
            res.status(400).send({ message: 'Email is required' });
            console.log('Email is required');
        }
        else if (!userExists) {
            res.json({ message: 'Email not found !!!' });
            console.log('Email not found !!! ');
        }
        else {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'guiratguirat123@gmail.com',
                    pass: ''
                }
            });

            const mailOptions = {
                from: 'guiratguirat123@gmail.com',
                to: email,
                subject: 'Forgot Password !! | Omi_Douja',
                html: `
                        <h1 style="text-align:center;color:Blue;">Omi_Douja</h1>
                        <h4 style="text-align:center;color:Blue;">Forgot Password</h4>
                        <hr/>
                        <br/><br/><br/>
                        <p>Your password is: <strong> ${userExists.password} </strong> <p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send({ message: "Email sended successfully !!!" });
                }
            });
        }
    }

};

const createAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '24h'
        }
    );
}

module.exports = authenticationController;