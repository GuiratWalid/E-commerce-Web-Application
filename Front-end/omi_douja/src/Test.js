import React from 'react';
import { connect } from 'react-redux';
import { addCategorie, deleteAllCategories, deleteCategorie, getAllCategories, getCategorie, updateCategorie } from './Data/Categorie/ActionCategorie';

const Test = (props) => {
    console.log(props)
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjcxYzA0MzFkM2ZmMWI3YzZhYmFmYSIsImlhdCI6MTYzNTMxNjE4NywiZXhwIjoxNjM1MzIzMzg3fQ.XNUgE80-RhLRmjJidBRVDcYhLP3TVoO859wQk1MCIKI');
    (props.error !== '') ? console.log(props.error) : console.log(props.categories);
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <button onClick={() => props.getCategorie("617900a34e2b6ff653190cc2")} style={{ color: "red", width: "100px", height: "40px", margin: "10px" }}>Get Categorie</button>
            <button onClick={() => props.getAllCategories()} style={{ color: "blue", width: "100px", height: "40px", margin: "10px" }}>Get All Categories</button>
            <button onClick={() => props.addCategorie({ name: "vzgre" })} style={{ color: "pink", width: "100px", height: "40px", margin: "10px" }}>Add Categorie</button>
            <button onClick={() => props.updateCategorie("617901a34e2b6ff653190ccf", { name: "zrir" })} style={{ color: "yellow", width: "100px", height: "40px", margin: "10px" }}>Update Categorie</button>
            <button onClick={() => props.deleteCategorie("617900a34e2b6ff653190cc2")} style={{ color: "green", width: "100px", height: "40px", margin: "10px" }}>Delete Categorie</button>
            <button onClick={() => props.deleteAllCategories()} style={{ color: "gray", width: "100px", height: "40px", margin: "10px" }}>Delete All Categories</button>
            {/*(props.error !== '') ? <h6 style={{ color: 'green' }}>{props.categories}</h6> : <h6 style={{ color: 'red' }} >{props.error}</h6>*/}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categorie.data,
        error: state.categorie.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategorie: id => dispatch(getCategorie(id)),
        getAllCategories: () => dispatch(getAllCategories()),
        addCategorie: categorie => dispatch(addCategorie(categorie)),
        updateCategorie: (id, categorie) => dispatch(updateCategorie(id, categorie)),
        deleteCategorie: id => dispatch(deleteCategorie(id)),
        deleteAllCategories: () => dispatch(deleteAllCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);