import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/Login';
import RegisterForm from './components/auth/Register';
import Navbar from './components/views/Navbar';
import HomePage from './components/views/Home';
import Cart from './components/views/Cart';
import WishList from './components/views/Wishlist';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(true); // Controls global loading screen
  const [error, setError] = useState(null);
  const [wishList, setWishList] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/get_current_user', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        setIsLoggedIn(true);
        setError(null); // Clear error on success
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
        if (response.status !== 401 && response.status !== 404) {
          setError('Error fetching user data.');
        }
      }
    } catch (error) {
      setError('Network error occurred while fetching user.');
    }
  };

  const fetchCartItems = async () => {
    if (!isLoggedIn || !currentUser) return;

    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        setError(null); // Clear error on success
      } else {
        setError('Error fetching cart items.');
      }
    } catch (error) {
      setError('Network error occurred while fetching cart.');
    }
  };

  const fetchWishList = async () => {
    const response = await fetch('http://localhost:5000/wish-list', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    setWishList(data);  
  };

  const initializeApp = async () => {
    setGlobalLoading(true);
    await fetchUser();
    setGlobalLoading(false);
  };


  useEffect(() => {
    
    initializeApp();
  }, []); // Runs once on mount

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetchCartItems();
    }
  }, [isLoggedIn, currentUser]); // Fetch cart items only after user info is loaded

  return (
    <Router>
      <div>
        {globalLoading ? (
          <h1 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',  // Full viewport height
              textAlign: 'center',
              backgroundColor: '#f8f9fa',  // Optional: for a light background
            }}
          >Loading, please wait...</h1>
        ) : (
          <>
            <Navbar
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              cartItems={cartItems}
            />
            {error && <div className="error-message">{error}</div>}
            <div style={{paddingTop: '160px'}}>
              <Switch >
                <Route exact path="/">
                  <HomePage fetchCartItems={fetchCartItems} isLoggedIn={isLoggedIn} fetchWishList={fetchWishList} wishList={wishList} />
                </Route>
                <Route exact path="/register">
                  <RegisterForm fetchUser={fetchUser} />
                </Route>
                <Route exact path="/login">
                  <LoginForm fetchUser={fetchUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </Route>
                <Route exact path="/cart">
                  <Cart
                    cartItems={cartItems}
                    fetchCartItems={fetchCartItems}
                    isLoggedIn={isLoggedIn}
                  />
                </Route>
                <Route exact path="/wishlist">
                  <WishList fetchWishList={fetchWishList} products={wishList}/>
                </Route>
              </Switch>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
