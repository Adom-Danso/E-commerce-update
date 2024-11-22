import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const LoginForm = ({isLoggedIn, fetchLoginStatus}) => {

	const [userEmails, setUserEmails] = useState([])

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [ispending, setIsPending] = useState(false)
	const history = useHistory()

	if (isLoggedIn) {
		history.push('/')
	}

	const fetchUserEmails = async () => {
	    const response = await fetch('http://localhost:5000/auth/get_users');
	    const data = await response.json();
	    setUserEmails(data.users)
	    console.log(data.users)
	}

	const isUserValid = (inputEmail) => {
		let isValid = false
		const userEmail = userEmails.map((user) => {
			if (user === inputEmail) {
				isValid = true
			}
		})
		console.log(isValid)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {email, password}

		console.log(email)
		console.log(password)

		fetch("http://localhost:5000/auth/login", {
		    method: 'POST',
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify(data)
		})
		.then((response) => {
		    if (response.ok) {
		        history.push('/')
    		    return response.json();
		    } else {
			    return response.json();
			    throw new Error(`HTTP error! Status: ${response.status}`);
		    }
		    
		})
		.then((response) => {
			console.log(response)
			
		})
		.catch((error) => console.error("Error:", error));

	}

	useEffect(() => {
		fetchLoginStatus()
		fetchUserEmails()
	}, [])


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

export default LoginForm