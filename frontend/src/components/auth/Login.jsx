import React from 'react';

const LoginForm = () => {
	return (
			<div class="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
			  <div class="signup-login border border-2 rounded-4 shadow p-4" style={{"max-width": '400px'}}>
			    <div class="text-center mb-4">
			      <h2 class="fw-bold" style={{color: '#343a40'}}>Login</h2>
			    </div>
			    <form method="POST" class="px-4" novalidate>
			      <div class="form-floating mb-3">
			          <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email" />
			          <label for="email">Email address</label>
			      </div>
			      <div class="form-floating mb-3">
			          <input type="password" class="form-control" id="password" placeholder="Password" name="password" />
			          <label for="password">Password</label>
			      </div>
			      <div class="text-end mb-3">
			          <a href="#" class="text-decoration-none" style={{color: 'white'}}>Forgot password?</a>
			      </div>
			      <div class="d-grid">
			          <button type="submit" class="btn btn-primary btn-block">Login</button>
			      </div>
			    </form>
			  </div>
			</div>
		)
}

export default LoginForm