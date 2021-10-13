const CategorieModel = require('../models/CategorieModel');

const CategorieController = {

    getAllCategorie: async (req, res) => {
        try {
            const categories = await CategorieModel.find();
            res.json(categories);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    getCategorie: async (req, res) => {
        const id = req.params.id;
        try {
            const categorie = await CategorieModel.findById(id);
            res.json(categorie);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    addCategorie: async (req, res) => {
        const name = req.body.name;
        if (!name) {
            res.status(500).send({ message: 'Name is required' });
            console.log('Name is required')
        }
        else {
            try {

                const categorie = new CategorieModel({
                    name: name
                });
                await categorie.save();
                res.json(categorie);
                console.log('Categorie added successfully !!! ');
            } catch (err) {
                res.status(500).json({ message: 'Server Error' });
                console.log(err);
            }
        }
    },

    updateCategorie: async (req, res) => {
        const name = req.body.name;
        if (!name) {
            res.status(400).send({ message: 'Name is required' });
            console.log('Name is required')
        }
        else {
            const newCategorie = {
                name: req.body.name
            };
            try {
                const categorie = await CategorieModel.findByIdAndUpdate(id, newCategorie);
                res.json(newCategorie);
                console.log('Categorie updated successfully !!! ');
            } catch (err) {
                res.status(400).json({ message: 'Error: ' + err });
                console.log(err);
            }
        }
    },

    deleteAllCategorie: async (req, res) => {
        try {
            const categories = await CategorieModel.deleteMany();
            res.json(categories);
            console.log('Categories deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteCategorie: async (req, res) => {
        const id = req.params.id;
        try {
            const categorie = await CategorieModel.findByIdAndDelete(id);
            res.json(categorie);
            console.log('Categorie deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    }

}

module.exports = CategorieController;