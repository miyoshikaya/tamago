import React from 'react';
import './login-style.css';
import { Link } from 'react-router-dom';
import * as routes from './constants/routes.js';
 
class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}


	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSubmitRegister = (event) => {
		event.preventDefault();

		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		//.then(response => response.text())
		//.then(text => console.log(text)) 
		.then(user => {
			if(user){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

	onLoginClick = (event) => {
		event.currentTarget.parentElement.classList.add("inactive-sx");
		event.currentTarget.parentElement.classList.remove("active-sx");
		//this.props.loginClickChange('login');
		//wysłać do parenta -> przełącz na login
		//event.currentTarget.parentElement.classList.add("active-dx");
	}

	render() {
		//const { onRouteChange } = this.props;
		return (
		<div className="container">
			<form className="signUp">
				<h3>Create Your Account</h3>
				<p>Just enter your email address<br />
				and your password for join.
				</p>
				<input type="text" 
				placeholder="Insert name" 
				required 
				onChange={this.onNameChange} />
				<input 
				className="w100"
				type="email"
			    placeholder="Insert email" 
				required autoComplete='off'
				onChange={this.onEmailChange} />
				<input 
				type="password" 
				placeholder="Insert password" 
				required 
				onChange={this.onPasswordChange} />
				<button onClick={this.onLoginClick} className="form-btn sx log-in" type="button">Log In</button>
				<Link to={routes.PET}><button className="form-btn dx" type="submit">Sign Up</button></Link>
			</form>
		</div>
		);
	}
}

export default SignUp;