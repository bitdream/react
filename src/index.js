import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {  HashRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom'
  import Calculator from './Calculator.js'
  import PixelEditor from './PixelEditor.js'
  import Tab from './Tab.js'


ReactDOM.render(
  <React.StrictMode>
    <Router>

      <Tab />
     <Switch>
    <Route path="/" exact >
    <App />
      </Route>/>
    <Route path="/calc" >
      <Calculator/>
    </Route>
    <Route path="/pixel" >
      <PixelEditor/>
    </Route>
    </Switch> 
    </Router>
  </React.StrictMode>,

//   <React.StrictMode>
//     <Calculator />
// </React.StrictMode>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
