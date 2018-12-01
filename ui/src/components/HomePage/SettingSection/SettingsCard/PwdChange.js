import React, { Component } from 'react';
import { auth } from '../../../../firebase';
import './pwdchange.css';

const byPropKey = (propertyName, value) => () => ({ 
	[propertyName]: value, 
});

const INITIAL_STATE = { passwordOne: '', passwordTwo: '', error: null, };

class PwdChangeForm extends Component { 
	constructor(props) {
	 super(props);

	this.state = { ...INITIAL_STATE };
}

onSubmit = (event) => { 
	const { 
		passwordOne 
	} = this.state;

	auth.doPasswordUpdate(passwordOne) 
	.then(() => { 
		this.setState({ ...INITIAL_STATE }); 
	}) 
	.catch(error => { 
		this.setState(byPropKey('error', error)); 
	});

	event.preventDefault();
}

render() {
	const { passwordOne, 
		passwordTwo, 
		error, 
	} = this.state;

	const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

	return ( 
		<form id="settings-form" onSubmit={this.onSubmit}> 
			<div className="dropdownWrapper">
              <div className="dropdown">
                <div className="dropdownTitle">New password:</div>
	                <div className="dropdownOption">
	                 	<input 
	                	value={passwordOne} 
						onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} 
	                	type="password" 
	                	placeholder="Insert new password" 
	                	required 
	                	className="pwd" />
	            	</div>
	            </div>
	        </div>
            <div className="dropdownWrapper">
              <div className="dropdown">
                <div className="dropdownTitle">Repeat the password:</div>
	                <div className="dropdownOption">
	                 	<input 
	                	value={passwordTwo} 
						onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} 
	                	type="password" 
	                	placeholder="Insert new password" 
	                	required 
	                	className="pwd" />
	            	</div>
	            </div>
	        </div>
			<button className="btn-reset" disabled={isInvalid} type="submit"><span>Reset My Password</span></button>
			{ error && <p>{error.message}</p> } 
		</form> 
	);	
	}
}
export default PwdChangeForm;
