import axios from 'axios';
import { ADD_COMMANDE, DELETE_ALL_COMMANDES, DELETE_COMMANDE, GET_ALL_COMMANDES, GET_COMMANDE, UPDTAE_COMMANDE, API_ERROR } from './Type';
import { GET_COMMANDE_TRAITE } from './Type';

export const getCommande = id => {
    return dispatch => {
        axios.get(`http://localhost:5000/commande/${id}`)
            .then(res => dispatch({
                type: GET_COMMANDE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const getCommandeTraite = traite => {
    return dispatch => {
        axios.get(`http://localhost:5000/commande/${traite}`)
            .then(res => dispatch({
                type: GET_COMMANDE_TRAITE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const getAllCommandes = () => {
    return dispatch => {
        axios.get('http://localhost:5000/commande')
            .then(res => dispatch({
                type: GET_ALL_COMMANDES,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const addCommande = commande => {
    return dispatch => {
        axios.post('http://localhost:5000/commande',
            commande)
            .then(res => dispatch({
                type: ADD_COMMANDE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const updateCommande = (id, commande) => {
    return dispatch => {
        axios.put(`http://localhost:5000/commande/${id}`,
            commande)
            .then(res =>
                dispatch({
                    type: UPDTAE_COMMANDE,
                    payload: res.data
                }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteCommande = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:5000/commande/${id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_COMMANDE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteAllCommandes = () => {
    return dispatch => {
        axios.delete('http://localhost:5000/commande',
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_ALL_COMMANDES,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};