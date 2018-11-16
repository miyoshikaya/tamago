import React from 'react';
import './nav-style.css';

const Navigation = ({ onRouteChange }) => {
	return (
		<nav>
			<nav className="stroke">
			    <ul>
			      <li className="nav-item">
			    	<p onClick={() => onRouteChange('home')} className="nav-link">Main Page</p>
				  </li>
				  <li className="nav-item">
			    	<p onClick={() => onRouteChange('pet')} className="nav-link">Pet</p>
				  </li>
				  <li className="nav-item">
			    	<p onClick={() => onRouteChange('progress')} className="nav-link">Progress</p>
				  </li>
				  <li className="nav-item">
			    	<p onClick={() => onRouteChange('tests')} className="nav-link">Study</p>
				  </li>
				  <li className="nav-item">
			    	<p onClick={() => onRouteChange('settings')} className="nav-link">Settings</p>
				  </li>
				  <li className="nav-item">
				    <p onClick={() => onRouteChange('signIn')} className="nav-link">Log out</p>
				  </li>
			    </ul>
			  </nav>
		</nav>
	);
}

export default Navigation;