import axios from 'axios';
import { ADD_USER, DELETE_ALL_USERS, DELETE_USER, GET_ALL_USERS, GET_USER, UPDTAE_USER, API_ERROR } from './Type';

export const getUser = id => {
    return dispatch => {
        axios.get(`http://localhost:5000/user/${id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: GET_USER,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const getAllUsers = () => {
    return dispatch => {
        axios.get('http://localhost:5000/user',
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const addUser = user => {
    return dispatch => {
        axios.post('http://localhost:5000/user',
            user,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: ADD_USER,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const updateUser = (id, user) => {
    return dispatch => {
        axios.put(`http://localhost:5000/user/${id}`,
            user,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res =>
                dispatch({
                    type: UPDTAE_USER,
                    payload: res.data
                }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteUser = id => {
    return dispatch => {
        axios.delete(`http://localhost:5000/user/${id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_USER,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};

export const deleteAllUsers = () => {
    return dispatch => {
        axios.delete('http://localhost:5000/user',
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => dispatch({
                type: DELETE_ALL_USERS,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: API_ERROR,
                payload: err.message
            }))
    };
};