const ProduitModel = require('../models/ProduitModel');
const fs = require('fs');
const path = require('path');

const ProduitController = {

    getAllProduit: async (req, res) => {
        try {
            const produits = await ProduitModel.find();
            res.json(produits);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    getProduit: async (req, res) => {
        const id = req.params.id;
        try {
            const produit = await ProduitModel.findById(id);
            res.json(produit);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    searchByName: async (req, res) => {
        var regex = new RegExp('.*' + req.params.name + '.*', "i");
        query = { name: regex };
        try {
            const produit = await ProduitModel.find(query);
            res.json(produit);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    addProduit: async (req, res) => {
        const {
            name,
            size,
            details,
            categorie,
            price
        } = req.body;
        if (!(name && size && details && categorie && price)) {
            res.status(500).send({ message: 'Name, size, details, categorie and price are required' });
            console.log('Name, size, details, categorie and price are required');
            return;
        }
        const image = req.file.path;
        const produit = new ProduitModel({
            name,
            image,
            size,
            details,
            categorie,
            price
        });
        try {
            await produit.save();
            res.json(produit);
            console.log('Produit added successfully !!! ');
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
            console.log(err);
        }
    },

    updateProduit: async (req, res) => {
        const id = req.params.id;
        const {
            name,
            size,
            details,
            categorie,
            price
        } = req.body;
        if (!(name && size && details && categorie && price)) {
            res.status(400).send({ message: 'Name, size, details, categorie and price are required' });
            console.log('Name, size, details, categorie and price are required');
            return;
        }
        const image = req.file.path;
        const newProduit = {
            name,
            image,
            size,
            details,
            categorie,
            price
        };
        try {
            await ProduitModel.findByIdAndUpdate(id, newProduit);
            const produit = await ProduitModel.findById(id);
            if (produit)
                fs.unlinkSync(path.join('images', produit.image.substring(6)));
            res.json(produit);
            console.log('Produit updated successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteAllProduit: async (req, res) => {
        try {
            const produits = await ProduitModel.deleteMany();
            const directory = 'images';
            fs.readdir(directory, (err, files) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ message: 'Error: ' + err });
                }
                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) {
                            console.log(err);
                            res.json({ message: 'Error: ' + err });
                        }
                    });
                }
            });
            res.json(produits);
            console.log('Produits deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteProduit: async (req, res) => {
        const id = req.params.id;
        try {
            const produit = await ProduitModel.findByIdAndDelete(id);
            if (produit)
                fs.unlinkSync(path.join('images', produit.image.substring(6)));
            res.json(produit);
            console.log('Produit deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    }

};

module.exports = ProduitController;