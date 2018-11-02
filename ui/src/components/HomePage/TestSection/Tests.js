import React from 'react';
import './tests-style.css';

const Tests = ({ onRouteChange }) => {
	return (
		<article className="flashcard">
		  <label for="toggle-1">Do Something</label>
		  <input type="checkbox" id="toggle-1" />
		  <div className="blah">Control me</div>
		</article>
	);
}

export default Tests;