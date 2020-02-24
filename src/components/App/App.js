import React from 'react';
import "./App.scss";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import SearchResults from '../SearchResults/SearchResults';
import Details from '../Details/Details';


const App = () => {
  return (
  
  <Router>
    <div>
      <Switch>
      <Route exact path="/search-results/:id"> <SearchResults /> </Route>
      <Route exact path="/"> <Home /> </Route>
      <Route exact path="/details/movie/:id"> <Details /> </Route>
      
      </Switch>

    </div>
  </Router>

)
      
};



export default App;
