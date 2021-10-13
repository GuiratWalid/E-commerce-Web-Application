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
            console.log(err);
            res.send(400).send({ message: 'Server Error' });
        }
    },

    getCommandeTraite: async (req, res) => {
        let traité;
        if (req.params.traite === "false")
            traité = false;
        else if (req.params.traite === "true")
            traité = true;
        else {
            res.status(400).send({ message: 'Params should be true or false' });
            console.log(err);
            return;
        }
        try {
            const commande = await CommandeModel.find({ traité });
            res.json(commande);
        } catch (err) {
            res.status(400).send({ message: 'Server Error' });
            console.log(err);
        }
    },

    addCommande: async (req, res) => {
        const {
            client,
            produits,
            traité
        } = req.body;
        if (!(client && produits && traité !== undefined)) {
            res.status(500).send({ message: 'Client, produits and traité are required' });
            console.log('Client, produits and traité are required');
            return;
        }
        const {
            firstName,
            lastName,
            telephone,
            email,
            adresse
        } = client;
        if (!(firstName && lastName && telephone && email && adresse)) {
            res.status(500).send({ message: 'FirstName, lastName, telephone, email and adresse are required' });
            console.log('FirstName, lastName, telephone, email and adresse are required');
            return;
        }
        const {
            rue,
            ville
        } = adresse;
        if (!(rue && ville)) {
            res.status(500).send({ message: 'Rue and ville are required' });
            console.log('Rue and ville are required');
            return;
        }
        for (let item of produits) {
            const {
                id,
                quantity,
                name
            } = item;
            if (!(id && quantity && name)) {
                console.log('Id, name and quantity are required');
                return res.status(500).send({ message: 'Id, name and quantity are required' });
            }
        }
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
        if (!(client && produits && traité !== undefined)) {
            res.status(400).send({ message: 'Client, produits and traité are required' });
            console.log('Client, produits and traité are required');
            return;
        }
        const {
            firstName,
            lastName,
            telephone,
            email,
            adresse
        } = client;
        if (!(firstName && lastName && telephone && email && adresse)) {
            res.status(400).send({ message: 'FirstName, lastName, telephone, email and adresse are required' });
            console.log('FirstName, lastName, telephone, email and adresse are required');
            return;
        }
        const {
            rue,
            ville
        } = adresse;
        if (!(rue && ville)) {
            res.status(400).send({ message: 'Rue and ville are required' });
            console.log('Rue and ville are required');
            return;
        }
        for (let item of produits) {
            const {
                id,
                quantity,
                name
            } = item;
            if (!(id && quantity && name)) {
                res.status(400).send({ message: 'Id, name and quantity are required' });
                console.log('Id, name and quantity are required');
                return;
            }
        };
        try {
            const newCommande = {
                client,
                produits,
                traité
            };
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