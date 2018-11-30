import React from 'react';
import './login-style.css';
import { Link, withRouter, } from 'react-router-dom';
import { auth } from '../../../firebase';
import * as routes from './constants/routes.js';
 
const SignUp = ({ history }) => 
	<div className="container">
		<SignUpForm  history={history} />
	</div>

const INITIAL_STATE = 
{ 
	email: '', 
	passwordOne: '', 
	passwordTwo: '', 
	error: null, 
};

const byPropKey = (propertyName, value) => () => ({ 
	[propertyName]: value, 
});

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

onSubmit = (event) => {
	const {  
		email, 
		passwordOne, 
	} = this.state;

	const { 
		history, 
	} = this.props;

	auth.doCreateUserWithEmailAndPassword(email, passwordOne) 
		.then(authUser => { 
			this.setState({ ...INITIAL_STATE }); 
			history.push(routes.PET);
		})
		.catch(error => { 
			this.setState(byPropKey('error', error)); 
		});

	event.preventDefault();
}

render() { 
	const { 
		email, passwordOne, 
		passwordTwo, 
		error, 
	} = this.state;

		const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '';

	return ( 
		<form className="signUp" onSubmit={this.onSubmit}>
			<h3>Create Your Account</h3>
			<p>Just enter your email address<br />
			and your password for join.
			</p>
			<input 
			className="w100"
			type="email"
			value={email}
			onChange={event => this.setState(byPropKey('email', event.target.value))}
		    placeholder="Insert email" 
			required
			autoComplete='off' />
			<input 
			type="password" 
			value={passwordOne}
			onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
			placeholder="Insert password" 
			required />
			<input 
			type="password" 
			value={passwordTwo}
			onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
			placeholder="Repeat password" 
			required />
			<Link to={routes.SIGN_IN}><button className="form-btn sx log-in" type="button">Log In</button></Link>
			<button className="form-btn dx" type="submit" disabled={isInvalid}>Sign Up</button>

			{ error && <p>{error.message}</p> } 
		</form>
		);
	}
}

const SignUpLink = () => 
<p> Don't have an account? 
	{' '} 
	<Link to={routes.SIGN_UP}>Sign Up</Link>
</p>

export default withRouter(SignUp);

export { 
	SignUpForm,
	SignUpLink, 
};
