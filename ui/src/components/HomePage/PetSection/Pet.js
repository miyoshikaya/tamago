import React from 'react';
import PetCard from './PetCard/PetCard.js';
import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';
//import { db } from '../../../firebase';



const authCondition = (authUser) => !!authUser;



const Pet = () => {


	firebase.auth.onAuthStateChanged(authUser => {
		if (!authCondition(authUser)) {
			window.location = routes.SIGN_IN;
		}
	});


	if (firebase.auth.currentUser !== null) {

		//var userinfo = Object.keys(user).map(key => { user[key] });
		return (
			<div>
				<PetCard userInfo={firebase.auth.currentUser.uid} />
			</div>
		);
	}
	else {
		return null;
	}
}
export default Pet;
