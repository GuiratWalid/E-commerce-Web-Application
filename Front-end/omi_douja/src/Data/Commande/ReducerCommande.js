import { ADD_COMMANDE, DELETE_ALL_COMMANDES, DELETE_COMMANDE, GET_ALL_COMMANDES, GET_COMMANDE, UPDTAE_COMMANDE, API_ERROR, GET_COMMANDE_TRAITE } from './Type';

const initialState = {
    data: [],
    error: ''
};

const reducerCommande = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMANDE:
            return {
                ...state,
                data: [action.payload],
                error: ''
            };
        case GET_ALL_COMMANDES:
            return {
                ...state,
                data: action.payload,
                error: ''
            };
        case GET_COMMANDE_TRAITE:
            return {
                ...state,
                data: action.payload,
                error: ''
            };
        case ADD_COMMANDE:
            return {
                ...state,
                data: state.data.concat(action.payload),
                error: ''
            };
        case UPDTAE_COMMANDE:
            return {
                ...state,
                error: '',
                data: state.data.map(item =>
                    (item._id === action.payload._id) ?
                        action.payload :
                        item
                ),
            };
        case DELETE_COMMANDE:
            return {
                ...state,
                error: '',
                data: state.data.filter(item => item._id !== action.payload._id)
            };
        case DELETE_ALL_COMMANDES:
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

export default reducerCommande;