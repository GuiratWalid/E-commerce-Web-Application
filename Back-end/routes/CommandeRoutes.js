const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');
const authentication = require('../middlewares/Authentication');


router.get('/commande', commandeController.getAllCommande);

router.get('/commande/:id', commandeController.getCommande);

router.post('/commande', commandeController.addCommande);

router.put('/commande/:id', commandeController.updateCommande);

router.delete('/commande', commandeController.deleteAllCommande);

router.delete('/commande/:id', authentication, commandeController.deleteCommande);


module.exports = router;