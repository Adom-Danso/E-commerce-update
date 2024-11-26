import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const LoginForm = ({ fetchUser, isLoggedIn, setIsLoggedIn }) => {
	const history = useHistory()

	const [userEmails, setUserEmails] = useState([])

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	

	const fetchUserEmails = async () => {
	    const response = await fetch('http://localhost:5000/auth/get_users');
	    const data = await response.json();
	    setUserEmails(data.users)
	}

	const isUserValid = (inputEmail) => {
		let isValid = false
		const userEmail = userEmails.map((user) => {
			if (user === inputEmail) {
				isValid = true
			}
		})
	}

	const handleSubmit = async (e) => {
	  e.preventDefault();

	  const data = { email, password };

	  try {
	    const response = await fetch("http://localhost:5000/auth/login", {
	      method: "POST",
	      headers: { "Content-Type": "application/json" },
	      body: JSON.stringify(data),
	      credentials: "include",
	    });

	    if (!response.ok) {
	      // Handle non-200 HTTP statuses
	      if (response.status === 401 || response.status === 404) {
	        setIsLoggedIn(false);
	      }
	      const errorData = await response.json();
	      console.error("Error response:", errorData);
	      return; // Stop further processing
	    }

	    // Successful response
	    const result = await response.json();
	    await fetchUser(); // Update user state

	    history.push("/"); 

	  } catch (error) {
	    // Handle network errors or unexpected issues
	    console.error("Unexpected error:", error);
	  }
	};


	useEffect(() => {
		fetchUserEmails()
	}, [])

	if (isLoggedIn) {
		history.go(-1)
	} else{
		return (
				<div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
				  <div className="signup-login border border-2 rounded-4 shadow p-4" style={{maxWidth: '400px'}}>
				    <div className="text-center mb-4">
				      <h2 className="fw-bold" style={{color: '#343a40'}}>Login</h2>
				    </div>
				    <form onSubmit={handleSubmit} className="px-4">
				      <div className="form-floating mb-3">
				          <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" value={email} onChange={(e) => {
					          		setEmail(e.target.value)
					          		isUserValid(e.target.value)
				          		}} />
				          <label htmlFor="email">Email address</label>
				      </div>
				      <div className="form-floating mb-3">
				          <input type="password" className="form-control" id="password" placeholder="Password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
				          <label htmlFor="password">Password</label>
				      </div>
				      <div className="text-end mb-3">
				          <a href="#" className="text-decoration-none" style={{color: 'white'}}>Forgot password?</a>
				      </div>
				      <div className="d-grid">
				          <button type="submit" className="btn btn-primary btn-block">Login</button>
				      </div>
				    </form>
				  </div>
				</div>
			)
	}


		

}

export default LoginForm