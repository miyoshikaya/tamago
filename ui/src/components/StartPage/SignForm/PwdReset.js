import React, { Component } from 'react';
import './login-style.css';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase';
import * as routes from './constants/routes.js';
 
const PwdReset = () =>
	<div>  
		<PasswordForgetForm />
	</div>

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value, 
});

const INITIAL_STATE = { 
	email: '', 
	error: null, 
};

class PasswordForgetForm extends Component { 
	constructor(props) { 
		super(props);
		this.state = { ...INITIAL_STATE };
}

onSubmit = (event) => { 
	const { email } = this.state;
	auth.doPasswordReset(email) 
	.then(() => { this.setState({ ...INITIAL_STATE }); }) 
	.catch(error => { 
		this.setState(byPropKey('error', error)); 
	});

	event.preventDefault();
}

	render() { 
		const { email, 
			error, 
		} = this.state;

		const isInvalid = email === '';

		return ( 
			<div className="container">
				<form className="signUp" onSubmit={this.onSubmit}> 
					<h3>Reset your password</h3>
					<p>Provide email address<br />
					connected to your account.
					</p>
					<hr />
					<input 
					value={this.state.email}
					onChange={event => this.setState(byPropKey('email', event.target.value))} 
					className="w100"
					type="email"
				    placeholder="Insert email" 
					required 
					autoComplete='off'
					className="pwd" />
					<Link to={routes.SIGN_IN}><button className="form-btn sx back" type="button">Back</button></Link>
					<button disabled={isInvalid} className="form-btn dx" type="submit">submit</button>

					{ error && <p>{error.message}</p> } 
				</form>
			</div>
			);
		}
}

export default PwdReset;

export { 
	PasswordForgetForm, 
};