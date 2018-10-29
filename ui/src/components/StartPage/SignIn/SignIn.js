import React from 'react';
import './login-style.css';


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = (event) => {
		event.preventDefault();

		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data === 'success'){
				this.props.onRouteChange('home');
			}
		})
	}

	render() {
		return (
  		<div className="container">
			<form className="signUp">
				<h3>Welcome<br />Back to<br />
				Tamagochi !</h3><br />
				<input
				type="email" 
				placeholder="Insert email" 
				autoComplete='off' 
				required
				onChange={this.onEmailChange} />
				<input 
				type="password" 
				placeholder="Insert password" 
				required
				onChange={this.onPasswordChange} />
				<button className="form-btn sx back" type="button">Back</button>
				<button onClick={this.onSubmitSignIn} className="form-btn dx" type="submit">Log In</button>
			</form>
		</div>
  		);
	}
}

export default SignIn;