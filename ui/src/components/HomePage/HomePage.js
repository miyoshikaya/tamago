import React from 'react';
import './home-style.css';
import HomeButtons from './HomeSection/HomeButtons.js';
import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';


const authCondition = (authUser) => !!authUser;


const HomePage = () => {

	firebase.auth.onAuthStateChanged(authUser => {
		if (!authCondition(authUser)) {
			window.location = routes.SIGN_IN;
		}
	});
	return (
		<div>
			<HomeButtons />
		</div>
	);

}
export default HomePage;