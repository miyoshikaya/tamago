import React from 'react';
import './home-buttons-style.css';

const HomeButtons = () => {
  	return (
  		<div className="main-container">
			<div className ="main-text col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="jumbotron jumbotron-fluid">
		  			<div className="container">
					    <h1 className="display-4">TAMAGO-CHI</h1>
					    <p className="lead">Welcome to language-learning game.<br />
					    Use flash-cards and short quizzes to make real progress!</p>
					    <br /><br />
					    <p className="reminder">
					    	Remember to play with your pet!
					    </p>
		  			</div>
		  		</div>
			</div>
		</div>
  	);

}

export default HomeButtons;