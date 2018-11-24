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
		this.props.onRouteChange('home');
		console.log("click");
		/*
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
      	.then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })*/
	}

	onBackClick = (event) => {
		event.currentTarget.parentElement.classList.add("inactive-dx");
		event.currentTarget.parentElement.classList.remove("active-dx");
		this.props.backClickChange('back');
	}

	render() {
		return (
  		<div className="container">
			<form className="signIn">
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
				<button onClick={this.onBackClick} className="form-btn sx back" type="button">Back</button>
				<button onClick={this.onSubmitSignIn} className="form-btn dx" type="submit">Log In</button>
			</form>
		</div>
  		);
	}
}

export default SignIn;