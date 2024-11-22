import React from 'react';
import {Link} from 'react-router-dom'

const RegisterForm = () => {
	return (
			<div class="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
			  <div class="signup-login border border-2 rounded-4 shadow p-4" style={{'max-width': '400px'}}>
			    <div class="text-center mb-2">
			      <h2 class="fw-bold" style={{color: "#343a40"}}>Sign Up</h2>
			    </div>
			    <form method="POST" class="px-4 py-4" novalidate>
			      <div class="row mb-3">
			          <div class="col-md-6">
			              <div class="form-floating">
			                  <input type="text" name="fname" class="form-control" id="fname" placeholder=" " />
			                  <label for="fname">First name</label>
			              </div>
			          </div>
			          <div class="col-md-6">
			              <div class="form-floating">
			                  <input type="text" name="lname" class="form-control" id="lname" placeholder=" " />
			                  <label for="lname">Last name</label>
			              </div>
			          </div>
			      </div>
			      <div class="form-floating mb-3">
			        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email" />
			        <label for="email">Email address</label>
			      </div>
			      <div class="form-floating mb-3">
			        <input type="password" class="form-control" id="password1" placeholder="Password" name="password1"  />
			        <label for="password1">Password</label>
			      </div>
			      <div class="form-floating mb-3">
			        <input type="password" class="form-control" id="password2" placeholder="Confirm Password" name="password2" />
			        <label for="password2">Confirm Password</label>
			      </div>
			      <div class="d-grid mb-3">
			        <Link type="submit" class="btn btn-primary btn-block">Sign Up</Link>
			      </div>
			    </form>
			  </div>
			</div>
		)
}

export default RegisterForm