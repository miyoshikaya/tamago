import React from 'react';
import './login-style.css';
import { Link } from 'react-router-dom';
import * as routes from './constants/routes.js';
 
class PwdReset extends React.Component {

	render() {
		//const { onRouteChange } = this.props;
		return (
		<div className="container">
			<form className="signUp">
				<h3>Reset your password</h3>
				<p>Provide email address<br />
				connected to your account.
				</p>
				{/*<input type="text" 
				placeholder="Insert name" 
				required 
				onChange={this.onNameChange} />*/}
				<hr />
				<input 
				className="w100"
				type="email"
			    placeholder="Insert email" 
				required autoComplete='off'
				onChange={this.onEmailChange} />
				{/*<input 
				type="password" 
				placeholder="Insert password" 
				required 
				onChange={this.onPasswordChange} />*/}
				<Link to={routes.SIGN_UP}><button className="form-btn sx back" type="button">Back</button></Link>
				<Link to={routes.PET}><button className="form-btn dx" type="submit">submit</button></Link>
			</form>
		</div>
		);
	}
}

export default PwdReset;