import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, currentUser, fetchUser, cartItems }) => {
  let navigation;

  if (isLoggedIn) {
    navigation = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
            <i className="bi bi-cart"></i> Cart
            {cartItems && cartItems.cartNumber > 0 && (
              <span className="badge bg-secondary">{cartItems.cartNumber}</span>
            )}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">
            <i className="bi bi-heart"></i> WishList
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person"></i> {currentUser?.firstName || 'User'}
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="#">
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Orders
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Admin Page
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Add new product
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item d-flex justify-content-between"
                to="#"
              >
                Sign out <i className="bi bi-box-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    );
  } else {
    navigation = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }

  useEffect(() => {
    // fetchUser();
  }, []);

  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark fixed-top p-3 border-bottom border-2">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EcommerceADY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Contact Us
              </Link>
            </li>
          </ul>

          <form
            className="d-flex"
            method="POST"
            action="{{ url_for('views.search') }}"
          >
            <input
              className="form-control me-2"
              type="text"
              name="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">{navigation}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
