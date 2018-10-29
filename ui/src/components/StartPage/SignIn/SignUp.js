import React from 'react';
import './login-style.css';
import './toggleFunctions.js';
import { showSignIn } from './toggleFunctions.js';

 
const SignUp = ({ onRouteChange }) => {
	return (
	<div className="container">
		<form className="signUp">
			<h3>Create Your Account</h3>
			<p>Just enter your email address<br />
			and your password for join.
			</p>
			<input className="w100" type="email" placeholder="Insert email" reqired autocomplete='off' />
			<input type="password" placeholder="Insert password" reqired />
			<input type="password" placeholder="Verify password" reqired />
			<button className="form-btn sx log-in" type="button" onClick={ showSignIn }>Log In</button>
			<button onClick={() => onRouteChange('home')} className="form-btn dx" type="submit">Sign Up</button>
		</form>
	</div>
	);
}

export default SignUp;