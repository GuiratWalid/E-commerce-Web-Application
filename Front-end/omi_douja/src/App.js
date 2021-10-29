/*import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import AdminPage from './Pages/Admin/AdminPage';
import ClientPage from './Pages/Client/ClientPage';

import store from './Data/Store';
import Register from './Pages/Admin/Register';

function App() {
  <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ClientPage} />
          <Route path="/admin/*">
            <AdminPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
  </Provider>
  return (
    <>
      <Register />
    </>
  );
}*/

import React from 'react';
import store from './Data/Store';
import { Provider } from 'react-redux';
import Test from './Test';

const App = () => {

  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
};

export default App;
