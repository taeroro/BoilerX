import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// non-packages


ReactDOM.render(
  <Router>
    <App />
  </Router>
  ,document.querySelector('.appContainer'));
registerServiceWorker();
