import React from 'react';
import ProgressCard from './ProgressCard/ProgressCard.js';
import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';


const authCondition = (authUser) => !!authUser;

const Progress = ({ onRouteChange }) => {

	firebase.auth.onAuthStateChanged(authUser => {
		if (!authCondition(authUser)) {
			window.location = routes.SIGN_IN;
		}
	});
	return (
		<div>
			<ProgressCard />
		</div>
	);
}

export default Progress;