import React from 'react';
import './pet-style.css';
import PetCard from './PetCard/PetCard.js';

const Pet = ({ onRouteChange }) => {
	return (
		<div>
			<PetCard />
		</div>
	);
}

export default Pet;