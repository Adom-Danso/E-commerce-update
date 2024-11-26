import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const RegisterForm = ({fetchUser, isLoggedIn}) => {
	const [userEmails, setUserEmails] = useState([])

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	const history = useHistory()

	const fetchUserEmails = async () => {
	    const response = await fetch('http://localhost:5000/auth/get_users');
	    const data = await response.json();
	    setUserEmails(data.users)
	    console.log(data.users)
	}

	const isUserValid = (inputEmail) => {
		let isValid = false
		const _ = userEmails.forEach((user) => {
			if (user === inputEmail) {
				isValid = true
			}
		})
		console.log(isValid)
	}

	const isPasswordMatch = (inputPassword) => {
		let isMatch = false;
		if (password1 === inputPassword) {
			isMatch = true
		}
		console.log(isMatch)
	}


	useEffect(() => {
		fetchUserEmails()
	}, [])

	if (isLoggedIn) {
		history.go(-1)
	} else {
		return (
				<div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
				  <div className="signup-login border border-2 rounded-4 shadow p-4" style={{maxWidth: '400px'}}>
				    <div className="text-center mb-2">
				      <h2 className="fw-bold" style={{color: "#343a40"}}>Sign Up</h2>
				    </div>
				    <form className="px-4 py-4">
				      <div className="row mb-3">
				          <div className="col-md-6">
				              <div className="form-floating">
				                  <input type="text" name="firstName" className="form-control" id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				                  <label htmlFor="firstName">First name</label>
				              </div>
				          </div>
				          <div className="col-md-6">
				              <div className="form-floating">
				                  <input type="text" name="lastName" className="form-control" id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				                  <label htmlFor="lastName">Last name</label>
				              </div>
				          </div>
				      </div>
				      <div className="form-floating mb-3">
				        <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email"  value={email} onChange={(e) => {
					        		setEmail(e.target.value)
					        		isUserValid(e.target.value)
				        		}}/>
				        <label htmlFor="email">Email address</label>
				      </div>
				      <div className="form-floating mb-3">
				        <input type="password" className="form-control" id="password1" placeholder="Password" name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)}  />
				        <label htmlFor="password1">Password</label>
				      </div>
				      <div className="form-floating mb-3">
				        <input type="password" className="form-control" id="password2" placeholder="Confirm Password" name="password2" value={password2} onChange={(e) => {
				        			setPassword2(e.target.value)
				        			isPasswordMatch(e.target.value)
				        		}} />
				        <label htmlFor="password2">Confirm Password</label>
				      </div>
				      <div className="d-grid mb-3">
				        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
				      </div>
				    </form>
				  </div>
				</div>
			)
	}
}

export default RegisterForm