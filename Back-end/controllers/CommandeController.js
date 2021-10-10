const CommandeModel = require('../models/CommandeModel');

const CommandeController = {

    getAllCommande: async (req, res) => {
        try {
            const commandes = await CommandeModel.find().sort({ 'submittedDate': 'desc' });
            res.json(commandes);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    getCommande: async (req, res) => {
        const id = req.params.id;
        try {
            const commande = await CommandeModel.findById(id);
            res.json(commande);
        } catch (err) {
            res.send(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    addCommande: async (req, res) => {
        const {
            client,
            produits,
            traité
        } = req.body;
        console.log(client);
        try {
            const commande = new CommandeModel({
                client,
                produits,
                traité
            });
            await commande.save();
            res.json(commande);
            console.log('Commande added successfully !!! ');
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
            console.log(err);
        }
    },

    updateCommande: async (req, res) => {
        const id = req.params.id;
        const {
            client,
            produits,
            traité
        } = req.body;
        const newCommande = {
            client,
            produits,
            traité
        };
        try {
            const commande = await CommandeModel.findByIdAndUpdate(id, newCommande);
            res.json(newCommande);
            console.log('Commande updated successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteAllCommande: async (req, res) => {
        try {
            const commandes = await CommandeModel.deleteMany();
            res.json(commandes);
            console.log('Commandes deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    },

    deleteCommande: async (req, res) => {
        const id = req.params.id;
        try {
            const commande = await CommandeModel.findByIdAndDelete(id);
            res.json(commande);
            console.log('Commande deleted successfully !!! ');
        } catch (err) {
            res.status(400).json({ message: 'Error: ' + err });
            console.log(err);
        }
    }

}

module.exports = CommandeController;