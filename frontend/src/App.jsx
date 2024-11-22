import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginForm from './components/auth/Login';
import RegisterForm from './components/auth/Register';
import Navbar from './components/views/Navbar';
import HomePage from './components/views/Home';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchLoginStatus = async () => {
    const response = await fetch('http://localhost:5000/auth/is_user_logged_in');
    const data = response.json()
    setIsLoggedIn(data.message)
  }

  useEffect(() => {
    fetchLoginStatus()
  })

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} fetchLoginStatus={fetchLoginStatus}/>
        <Switch>
          <Route exact path='/'>
            <HomePage isLoggedIn={isLoggedIn} fetchLoginStatus={fetchLoginStatus} />
          </Route>
          <Route exact path='/register'>
            <RegisterForm isLoggedIn={isLoggedIn} fetchLoginStatus={fetchLoginStatus}/>
          </Route>
          <Route exact path='/login'>
            <LoginForm isLoggedIn={isLoggedIn} fetchLoginStatus={fetchLoginStatus}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;