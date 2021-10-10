const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/CategorieController');
const authentication = require('../middlewares/Authentication');


router.get('/categorie', categorieController.getAllCategorie);

router.get('/categorie/:id', categorieController.getCategorie);

router.post('/categorie', authentication, categorieController.addCategorie);

router.put('/categorie/:id', authentication, categorieController.updateCategorie);

router.delete('/categorie', authentication, categorieController.deleteAllCategorie);

router.delete('/categorie/:id', authentication, categorieController.deleteCategorie);


module.exports = router;