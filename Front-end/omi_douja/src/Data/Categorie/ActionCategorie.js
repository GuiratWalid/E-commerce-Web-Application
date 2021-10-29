import axios from 'axios';
import { ADD_CATEGORIE, DELETE_ALL_CATEGORIES, DELETE_CATEGORIE, GET_ALL_CATEGORIES, GET_CATEGORIE, UPDTAE_CATEGORIE, API_ERROR } from './Type';

export const getCategorie = id => {
    return dispatch => {
        axios.get(`http://localhost:5000/categorie/${id}`)
            .then(res => dispatch({
                type: GET_CATEGORIE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const getAllCategories = () => {
    return dispatch => {
        axios.get('http://localhost:5000/categorie')
            .then(res => dispatch({
                type: GET_ALL_CATEGORIES,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const addCategorie = categorie => {
    return dispatch => {
        axios.post('http://localhost:5000/categorie',
            categorie,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: ADD_CATEGORIE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const updateCategorie = (id, categorie) => {
    return dispatch => {
        axios.put(`http://localhost:5000/categorie/${id}`,
            categorie,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res =>
                dispatch({
                    type: UPDTAE_CATEGORIE,
                    payload: res.data
                }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteCategorie = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:5000/categorie/${id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_CATEGORIE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteAllCategories = () => {
    return dispatch => {
        axios.delete('http://localhost:5000/categorie',
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_ALL_CATEGORIES,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};