import React from 'react';
import QuizCard from './QuizCard.js';
import QuizSettings from './QuizSettings.js';
import './quizzes.css';

const Quizzes = ({ onRouteChange }) => {
	return (
		<div className="centered" id="main-Container">
	        <div className="half purple">
	        	<QuizSettings />
	        </div> 
	        <div className="other-half">
	        	<hr />
	        	<QuizCard />
	        </div>
        </div>
	);
}

export default Quizzes;