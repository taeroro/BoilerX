import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pormise from 'redux-promise';

// non-packages
import reducers from './reducers';
import TopNavBar from './components/elements/top_nav_bar';
import HomePage from './components/pages/home_page';

const createStoreWithMiddleware = applyMiddleware(Pormise)(createStore);

// Switch only renders the first element
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <TopNavBar />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.appContainer'));
