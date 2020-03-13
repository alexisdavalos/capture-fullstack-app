import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import './App.scss';
import Logo from '../imgs/logo.png'

//Component imports

import Register from './Register/Register'
import Login from './Login/Login';
import Home from './Home/Home';
// //logs user out after 30 minutes
// setTimeout(() => { localStorage.clear() }, 1800000);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Header-Menu">
          <div className='Logo'>
            <img src={Logo} alt='Capture Logo' />
          </div>
          <div className='Menu-Form'>
            <a href='/register'>Register</a>
            <span>or</span>
            <a href='/login'>Login</a>
          </div>
        </header>

        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute path='/' component={Home} />
        </Switch>


      </div>
    </Router>
  );
}

export default App;
