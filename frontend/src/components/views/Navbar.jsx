import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="navbar navbar-expand-md navbar-dark bg-dark fixed-top p-3 border-bottom border-2">
		  <div className="container-fluid">
		    <Link className="navbar-brand" to="/">EcommerceADY</Link>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
		          <a className="nav-link" href="#">
		            Contact Us
		          </a>
		        </li>
		      </ul>
		      
		      <form className="d-flex" method="POST" action="{{ url_for('views.search') }}">
		        <input className="form-control me-2" type="text" name="search" placeholder="Search..." aria-label="Search" />
		        <button className="btn btn-outline-secondary" type="submit">
		          <i className="bi bi-search"></i>
		        </button>
		      </form>

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
		    </div>
		  </div>
		</div>
	)
}

export default Navbar;