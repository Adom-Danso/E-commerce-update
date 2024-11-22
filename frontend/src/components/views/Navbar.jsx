import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
	let navigation;
	if (isLoggedIn) {
		navigation = (
		<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
			<li class="nav-item">
	          <a class="nav-link" href="{{ url_for('views.cart') }}">
	            <i class="bi bi-cart"></i> Cart
	            {/*{% if cart_no > 0 %}
	            <span class="badge bg-secondary">{{ cart_no }}</span>
	            {% endif %}*/}
	          </a>
	        </li>
	        <li class="nav-item">
	          <a class="nav-link" href="#">
	            <i class="bi bi-heart"></i> WishList
	          </a>
	        </li>
	        <li class="nav-item dropdown">
	          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
	            {/*<i class="bi bi-person"></i> {{current_user.first_name}}*/}
	          </a>
	          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
	            <li><a class="dropdown-item " href="">Profile </a></li>
	            <li>
	                <a class="dropdown-item" href="">Orders</a>
	            </li>
	            <li><hr class="dropdown-divider" /></li>
				<li><a class="dropdown-item" href="">Admin Page</a></li>
				<li><a class="dropdown-item" href="">Add new product</a></li>
				<li><hr class="dropdown-divider" /></li>
	            <li><a class="dropdown-item" href="#">Settings</a></li>
	            <li><a class="dropdown-item d-flex justify-content-between" href="">Sign out <i class="bi bi-box-arrow-right"></i></a></li>
	          </ul>
	        </li>
	    </ul>
			)
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
        )
  		}

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
		      	{navigation}		      	
		      </ul>
		    </div>
		  </div>
		</div>
	)
}

export default Navbar;