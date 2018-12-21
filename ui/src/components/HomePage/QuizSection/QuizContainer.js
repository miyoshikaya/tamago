import React, { Component } from 'react';
import QuizCard from './QuizCard.js';
import QuizSettings from './settings/QuizSettings.js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 

class QuizContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	category: 'animals',
    	quizComplete: false,
    }

    this.receiveCategory = this.receiveCategory.bind(this);
   }

receiveCategory = (cat) => {
	//check if the quiz is complete
	if(!this.state.quizComplete){
		confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to restart the quiz? You will lose all progress.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
            	this.setState({
			   		category: cat,
			   	});
			   	console.log('new quiz starting');
            }
          },
          {
            label: 'No'
            //nothing -> continue with the quiz
          }
        ]
      })
	}
	else {
		//wygenerowanie nowego quizu

		this.setState({
			quizComplete: false,
		});
		console.log('new quiz starting');
	}
	
}

getQuizComplete = (completion) => {
	this.setState({
		quizComplete: completion,
	});
	console.log(completion);
}

	render() {
	    return (
	    	<div className="centered" id="main-Container">
		        <div className="half purple">
		        	<QuizSettings changeCat={this.receiveCategory} />
		        </div> 
		        <div className="other-half">
		        	<hr />
		        	<QuizCard category={this.state.category} quizComplete={this.getQuizComplete} />
		        </div>
	        </div>
	    );
	}
}

export default QuizContainer;
