import { ADD_PRODUIT, DELETE_ALL_PRODUITS, DELETE_PRODUIT, GET_ALL_PRODUITS, GET_PRODUIT, UPDTAE_PRODUIT, API_ERROR, SEARCH_BY_NAME } from './Type';

const initialState = {
    data: [],
    error: ''
};

const reducerProduit = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUIT:
            return {
                ...state,
                data: [action.payload],
                error: ''
            };
        case GET_ALL_PRODUITS:
            return {
                ...state,
                data: action.payload,
                error: ''
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                data: action.payload,
                error: ''
            };
        case ADD_PRODUIT:
            return {
                ...state,
                data: state.data.concat(action.payload),
                error: ''
            };
        case UPDTAE_PRODUIT:
            return {
                ...state,
                error: '',
                data: state.data.map(item =>
                    (item._id === action.payload._id) ?
                        action.payload :
                        item
                ),
            };
        case DELETE_PRODUIT:
            return {
                ...state,
                error: '',
                data: state.data.filter(item => item._id !== action.payload._id)
            };
        case DELETE_ALL_PRODUITS:
            return {
                ...state,
                data: [],
                error: ''
            };

        case API_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducerProduit;