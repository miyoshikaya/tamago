import React from 'react';
import './nav-style.css';
import { Link } from 'react-router-dom';
import * as routes from './constants/routes.js';
import SignOutButton from './components/SingOutButton/SignOutButton.js';

const Navigation = () => {
	return (
		<nav>
			<nav className="stroke">
			    <ul>
			      <li className="nav-item">
			      	<Link to={routes.PET}><p className="nav-link">Pet</p></Link>
			      </li>
			      <li className="nav-item">
			      	<Link to={routes.STUDY}><p className="nav-link">Study</p></Link>
			      </li>
			      <li className="nav-item">
			      	<Link to={routes.QUIZ}><p className="nav-link">Quizzes</p></Link>
			      </li>
			      <li className="nav-item">
			      	<Link to={routes.PROGRESS}><p className="nav-link">Progress</p></Link>
			      </li>
			      <li className="nav-item">
			      	<Link to={routes.SETTINGS}><p className="nav-link">Settings</p></Link>
			      </li>
			      <li className="nav-item">
			      	<Link to={routes.LANDING}><p className="nav-link"><SignOutButton /></p></Link>
			      </li>
			    </ul>
			  </nav>
		</nav>
	);
}

export default Navigation;