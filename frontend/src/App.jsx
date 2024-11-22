import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginForm from './components/auth/Login';
import Navbar from './components/views/Navbar';
import RegisterForm from './components/auth/Register';


const App = () => {

  const [users, setUsers] = useState([])

  // useEffect(() ={
    
  // })

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <h1>Home</h1>
          </Route>
          <Route exact path='/register'>
            <RegisterForm />
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;