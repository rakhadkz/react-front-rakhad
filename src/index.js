import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Catalog from './Catalog/Catalog';
import Movie from './Movie/Movie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundItem from './NotFound'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Route exact path='/catalogs/:catalog_id' render={(props) => <Movie {...props}/>}></Route>
      <Route exact path={['/catalogs', '/', '/catalog']} component={Catalog}></Route>
      <Route path='/*' component={NotFoundItem}/>
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);