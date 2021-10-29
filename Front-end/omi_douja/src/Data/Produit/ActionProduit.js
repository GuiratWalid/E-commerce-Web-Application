import axios from 'axios';
import { ADD_PRODUIT, DELETE_ALL_PRODUITS, DELETE_PRODUIT, GET_ALL_PRODUITS, GET_PRODUIT, UPDTAE_PRODUIT, API_ERROR, SEARCH_BY_NAME } from './Types';

export const getProduit = id => {
    return dispatch => {
        axios.get(`http://localhost:5000/produit/${id}`)
            .then(res => dispatch({
                type: GET_PRODUIT,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const searchByName = name => {
    return dispatch => {
        axios.get(`http://localhost:5000/produitByName/${name}`)
            .then(res => dispatch({
                type: SEARCH_BY_NAME,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const getAllProduits = () => {
    return dispatch => {
        axios.get('http://localhost:5000/produit')
            .then(res => dispatch({
                type: GET_ALL_PRODUITS,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const addProduit = produit => {
    return dispatch => {
        axios.post('http://localhost:5000/produit',
            produit,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: ADD_PRODUIT,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const updateProduit = (id, produit) => {
    return dispatch => {
        axios.put(`http://localhost:5000/produit/${id}`,
            produit,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res =>
                dispatch({
                    type: UPDTAE_PRODUIT,
                    payload: res.data
                }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteProduit = id => {
    return dispatch => {
        axios.delete(`http://localhost:5000/produit/${id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_PRODUIT,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteAllProduits = () => {
    return dispatch => {
        axios.delete('http://localhost:5000/produit',
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_ALL_PRODUITS,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};