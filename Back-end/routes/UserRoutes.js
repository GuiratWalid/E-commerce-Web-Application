const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authentication = require('../middlewares/Authentication');


router.get('/user', authentication, userController.getAllUsers);

router.get('/user/:id', authentication, userController.getUser);

router.post('/user', authentication, userController.addUser);

router.put('/user/:id', authentication, userController.updateUser);

router.delete('/user', authentication, userController.deleteAllUsers);

router.delete('/user/:id', authentication, userController.deleteUser);


module.exports = router;