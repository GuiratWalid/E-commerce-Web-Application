const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const UserController = {

    getAllUsers: async (req, res) => {
        const currentRole = req.body.currentRole;
        if (!currentRole) {
            res.status(403).send({ message: "A role is required" });
            console.log(`A role is required`);
        }
        else if (req.body.currentRole === 'admin') {
            try {
                const users = await UserModel.find();
                res.json(users);
            } catch (err) {
                res.send(400).send({ message: 'Server Error' });
                console.log(err);
            }
        }
        else {
            res.status(401).send({ message: "Only admin can access to this API" });
            console.log(`Only admin can access to this API`);
        }
    },

    getUser: async (req, res) => {
        const currentRole = req.body.currentRole;
        const id = req.params.id;
        if (!currentRole) {
            res.status(403).send({ message: "A role is required" });
            console.log(`A role is required`);
        }
        else if (req.body.currentRole === 'admin') {
            try {
                const user = await UserModel.findById(id);
                res.json(user);
            } catch (err) {
                res.send(400).send({ message: 'Server Error' });
                console.log(err);
            }
        }
        else {
            res.status(401).send({ message: "Only admin can access to this API" });
            console.log(`Only admin can access to this API`);
        }
    },

    addUser: async (req, res) => {
        const currentRole = req.body.currentRole;
        if (!currentRole) {
            console.log(`A role is required`);
            res.status(403).send({ message: "A role is required" });
        }
        else if (currentRole === 'admin') {
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
                res.status(500).json({ message: 'Password should contain at least 6 Characters !!!' });
                console.log('Password should contain at least 6 Characters !!!');
            }
            else if (userExists) {
                res.status(500).json({ message: 'Email is already used !!!' });
                console.log('Email is already used !!! ');
            }
            else if (role !== 'admin' && role !== 'moderateur') {
                res.status(500).json({ message: 'Role should be admin or moderateur !!!' });
                console.log('Role should be admin or moderateur !!!');
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
                    res.json(user);
                    console.log('User added successfully !!! ');
                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Server Error' });
                }
            }
        }
        else {
            console.log(`Only admin can access to this API`);
            res.status(401).send({ message: "Only admin can access to this API" });
        }
    },

    updateUser: async (req, res) => {
        const currentRole = req.body.currentRole;
        const id = req.params.id;
        if (!currentRole) {
            console.log(`A role is required`);
            res.status(403).send({ message: "A role is required" });
        }
        else if (req.body.currentRole === 'admin') {
            const {
                firstName,
                lastName,
                password,
                role
            } = req.body;
            if (!password || password.length < 6) {
                res.status(400).json({ message: 'Password should contain at least 6 Characters !!!' });
                console.log('Password should contain at least 6 Characters !!!');
            }
            else if (role !== 'admin' && role !== 'moderateur') {
                res.status(400).json({ message: 'Role should be admin or moderateur !!!' });
                console.log('Role should be admin or moderateur !!!');
            }
            else {
                const passwordHash = await bcrypt.hash(password, 10);
                const newUser = {
                    firstName,
                    lastName,
                    password: passwordHash,
                    role
                };
                try {
                    await UserModel.findByIdAndUpdate(id, newUser);
                    res.json(newUser);
                    console.log('User updated successfully !!! ');
                } catch (err) {
                    res.status(400).json({ message: 'Error: ' + err });
                    console.log(err);
                }
            }
        }
        else {
            console.log(`Only admin can access to this API`);
            res.status(401).send({ message: "Only admin can access to this API" });
        }
    },

    deleteAllUsers: async (req, res) => {
        const currentRole = req.body.currentRole;
        const id = req.params.id;
        if (!currentRole) {
            console.log(`A role is required`);
            res.status(403).send({ message: "A role is required" });
        }
        else if (req.body.currentRole === 'admin') {
            try {
                const users = await UserModel.deleteMany();
                res.json(users);
                console.log('Users deleted successfully !!! ');
            } catch (err) {
                res.status(400).json({ message: 'Error: ' + err });
                console.log(err);
            }
        }
        else {
            console.log(`Only admin can access to this API`);
            res.status(401).send({ message: "Only admin can access to this API" });
        }
    },

    deleteUser: async (req, res) => {
        const currentRole = req.body.currentRole;
        const id = req.params.id;
        if (!currentRole) {
            console.log(`A role is required`);
            res.status(403).send({ message: "A role is required" });
        }
        else if (req.body.currentRole === 'admin') {
            try {
                const user = await UserModel.findByIdAndDelete(id);
                res.json(user);
                console.log('User deleted successfully !!! ');
            } catch (err) {
                res.status(400).json({ message: 'Error: ' + err });
                console.log(err);
            }
        }
        else {
            console.log(`Only admin can access to this API`);
            res.status(401).send({ message: "Only admin can access to this API" });
        }
    }

};

module.exports = UserController;