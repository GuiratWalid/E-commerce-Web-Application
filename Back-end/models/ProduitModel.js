const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const Produit = mongoose.model("Produit", ProduitSchema);

module.exports = Produit;