import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducerCategorie from './Categorie/ReducerCategorie';
import reducerProduit from './Produit/ReducerProduit';
import reducerCommande from './Commande/ReducerCommande';
import reducerUser from './User/ReducerUser';

const reducer = combineReducers({
    categorie: reducerCategorie,
    produit: reducerProduit,
    commande: reducerCommande,
    user: reducerUser

});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;