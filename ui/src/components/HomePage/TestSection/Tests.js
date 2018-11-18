import React from 'react';
import './tests-style.css';
import CardsContainer from './CardsContainer/CardsContainer.js';
import SettingsContainer from './SettingsContainer/SettingsContainer.js';
import CardTitle from './CardsContainer/CardTitle/CardTitle.js';

const Tests = ({ onRouteChange }) => {
	return (
		<div className="centered-study" id="mainWrap">
		  <div className="half">
		    <div id="lang-title">
		    	<CardTitle />
		    	<hr className="hr-class" />
		    	<CardsContainer />
		    </div>
		    
		  </div>
		  <div className="half purple">
		    <div id="settingsWrapperCard">
		        <SettingsContainer />
		    </div>
		  </div>
		</div>
	);
}

export default Tests;