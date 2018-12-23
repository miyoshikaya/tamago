import React from 'react';
import PetCard from './PetCard/PetCard.js';
import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';


const authCondition = (authUser) => !!authUser;

const Pet = () => {
	firebase.auth.onAuthStateChanged(authUser => {
		if (!authCondition(authUser)) {
			window.location = routes.SIGN_IN;
		}
	});
	return (
		<div>
			<PetCard />
		</div>
	);
}

export default Pet;
