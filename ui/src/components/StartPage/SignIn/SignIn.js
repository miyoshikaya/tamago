import React from 'react';
import './login-style.css';
import './toggleFunctions.js';


class SignIn extends React.Component {
	render( ) {
		const { onRouteChange } = this.props;
		return (
  		<div className="container">
			<form className="signUp">
				<h3>Welcome<br />Back to<br />
				Tamagochi !</h3><br />
				<input type="email" placeholder="Insert email" autocomplete='off' reqired />
				<input type="password" placeholder="Insert password" reqired />
				<button className="form-btn sx back" type="button">Back</button>
				<button onClick={() => onRouteChange('home')}
				 className="form-btn dx" type="submit">Log In</button>
			</form>
		</div>
  		);
	}
}

export default SignIn;