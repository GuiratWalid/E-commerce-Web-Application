const express = require('express');
const router = express.Router();
const multer = require('multer');
const produitController = require('../controllers/ProduitController');
const authentication = require('../middlewares/Authentication');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '\images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/produit', produitController.getAllProduit);

router.get('/produit/:id', produitController.getProduit);

router.get('/produitByName/:name', produitController.searchByName);

router.post('/produit', authentication, upload.single('image'), produitController.addProduit);

router.put('/produit/:id', authentication, upload.single('image'), produitController.updateProduit);

router.delete('/produit', authentication, produitController.deleteAllProduit);

router.delete('/produit/:id', authentication, produitController.deleteProduit);


module.exports = router;