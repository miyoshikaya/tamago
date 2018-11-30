import React from 'react';
import { auth } from '../../firebase';
import './signoutbutton.css';

const SignOutButton = () => 
	<button className="nav-link sign-out-btn" type="button" onClick={auth.doSignOut}> 
		Sign Out
	</button>

export default SignOutButton;
