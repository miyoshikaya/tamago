import React from 'react';
import './login-style.css';
import { Link, withRouter, } from 'react-router-dom';
import { auth } from '../../../firebase';
import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes.js';

const authCondition = (authUser) => !!authUser;

const SignIn = ({ history }) =>
	<div>
		<SignInForm history={history} />
	</div>

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

class SignInForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const {
			email,
			password,
		} = this.state;

		const {
			history,
		} = this.props;

		auth.doSignInWithEmailAndPassword(email, password)
			.then(() => {
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
			email,
			password,
			error,
		} = this.state;

		const isInvalid = password === '' || email === '';
		firebase.auth.onAuthStateChanged(authUser => {
			if (authCondition(authUser)) {
				window.location = routes.PET;
			}
		});
		return (
			<div className="container">
				<form onSubmit={this.onSubmit} className="signUp">
					<h3>Welcome<br />Back to<br />
						Tamagochi !</h3><br />
					<input
						type="email"
						value={email}
						onChange={event => this.setState(byPropKey('email', event.target.value))}
						placeholder="Insert email"
						autoComplete='off'
						required
						className="pwd" />
					<input
						type="password"
						value={password}
						onChange={event => this.setState(byPropKey('password', event.target.value))}
						placeholder="Insert password"
						required />
					<Link to={routes.PASSWORD_FORGET}><p className="p-button" unselectable="on">Forgot your password?</p></Link>
					<Link to={routes.SIGN_UP}><button className="form-btn sx back" type="button">Sign Up</button></Link>
					<button className="form-btn dx" type="submit" disabled={isInvalid}>Log In</button>

					{error && <p>{error.message}</p>}
				</form>
			</div>
		);
	}
}

export default withRouter(SignIn);
export { SignInForm, };
