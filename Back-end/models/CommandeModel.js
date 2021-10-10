const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        telephone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        adresse: {
            rue: {
                type: String,
                required: true
            },
            ville: {
                type: String,
                required: true
            }
        },
    },
    produits: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    traité: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Commande = mongoose.model("Commande", CommandeSchema);

module.exports = Commande;