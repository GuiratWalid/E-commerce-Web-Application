import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProduitsPage from './Produits/ProduitsPage';

import SignIn from './SignIn';

const AdminPage = () => {
    return (
        <>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/produits" component={ProduitsPage} />
        </>
    );
};

export default AdminPage;