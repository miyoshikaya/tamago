import React from 'react';
import PetCard from './PetCard/PetCard.js';
//import withAuthorization from '../../../withAuthorization';


const Pet = () => {
	return (
		<div>
			<PetCard />
		</div>
	);
}

//const authCondition = (authUser) => !!authUser;
export default Pet;

//export default withAuthorization(authCondition)(Pet);