import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivatRoute/PrivateRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/"> 
            <Shop/>
          </Route>
          <Route path="/shop">
            <Shop/>
          </Route>
          <Route path="/review">
            <Review/>
          </Route>
          <Route path="/manage">
            <Manage/>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
