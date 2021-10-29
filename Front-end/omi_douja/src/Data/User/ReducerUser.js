import { ADD_USER, DELETE_ALL_USERS, DELETE_USER, GET_ALL_USERS, GET_USER, UPDTAE_USER, API_ERROR } from './Type';

const initialState = {
    data: [],
    error: ''
};

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                data: [action.payload],
                error: ''
            };
        case GET_ALL_USERS:
            return {
                ...state,
                data: action.payload,
                error: ''
            };
        case ADD_USER:
            return {
                ...state,
                data: state.data.concat(action.payload),
                error: ''
            };
        case UPDTAE_USER:
            return {
                ...state,
                error: '',
                data: state.data.map(item =>
                    (item._id === action.payload._id) ?
                        action.payload :
                        item
                ),
            };
        case DELETE_USER:
            return {
                ...state,
                data: state.data.filter(item => item._id !== action.payload._id),
                error: ''
            };
        case DELETE_ALL_USERS:
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

export default reducerUser;