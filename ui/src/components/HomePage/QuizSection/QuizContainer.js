import React, { Component } from 'react';
import QuizCard from './QuizCard.js';
import QuizSettings from './settings/QuizSettings.js';

class QuizContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	category: '',
    }

    this.receiveCategory = this.receiveCategory.bind(this);
   }

receiveCategory = (cat) => {
	this.setState({
   		category: cat,
   	});
   	console.log(this.state.category);
}

	render() {
	    return (
	    	<div className="centered" id="main-Container">
		        <div className="half purple">
		        	<QuizSettings changeCat={this.receiveCategory} />
		        </div> 
		        <div className="other-half">
		        	<hr />
		        	<QuizCard category={this.state.category} />
		        </div>
	        </div>
	    );
	}
}

export default QuizContainer;
