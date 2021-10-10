const express = require('express');
const cors = require('cors');
const connection = require('./configurations/configDB');
const categorie = require('./routes/CategorieRoutes');
const produit = require('./routes/ProduitRoutes');
const user = require('./routes/AuthenticationRoutes');
const commande = require('./routes/CommandeRoutes');
let app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} `);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('images'));
app.use(user);
app.use(categorie);
app.use(produit);
app.use(commande);

app.get("/", (req, res) => {
    res.send("connected successfully !!")
});
