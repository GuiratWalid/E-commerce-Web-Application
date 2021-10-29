import { ADD_CATEGORIE, DELETE_ALL_CATEGORIES, DELETE_CATEGORIE, GET_ALL_CATEGORIES, GET_CATEGORIE, UPDTAE_CATEGORIE, API_ERROR } from './Type';

const initialState = {
    data: [],
    error: ''
};

const reducerCategorie = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIE:
            return {
                ...state,
                data: [action.payload],
                error: ''
            };
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                data: action.payload,
                error: ''
            };
        case ADD_CATEGORIE:
            return {
                ...state,
                data: state.data.concat(action.payload),
                error: ''
            };
        case UPDTAE_CATEGORIE:
            return {
                ...state,
                error: '',
                data: state.data.map(item =>
                    (item._id === action.payload._id) ?
                        action.payload :
                        item
                ),
            };
        case DELETE_CATEGORIE:
            return {
                ...state,
                data: state.data.filter(item => item._id !== action.payload._id),
                error: ''
            };
        case DELETE_ALL_CATEGORIES:
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

export default reducerCategorie;