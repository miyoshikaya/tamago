import React, { Component } from 'react';
//import QuizCard from './QuizCard.js';
import QuizCard from './QuizCard/QuizCard.js';
import QuizSettings from './settings/QuizSettings.js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 

class QuizContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	category: 'People',
    	quizCompleted: false,
    	startNewQuiz: true,
    }

    this.receiveCategory = this.receiveCategory.bind(this);
   }

receiveCategory = (cat) => {
	console.log(cat);

	//check if the quiz is complete
	if(!this.state.quizCompleted){
		confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to restart the quiz? You will lose all progress.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
            	this.setState({
			   		category: cat,
			   		startNewQuiz: true,
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
			quizCompleted: false,
			startNewQuiz: true,
		});
		console.log('new quiz starting');
	}
	
}

getQuizComplete = (completion) => {
	this.setState({
		quizCompleted: completion,
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
		        	<QuizCard 
		        		category={this.state.category} 
		        		quizComplete={this.getQuizComplete} 
		        		completed={this.state.quizCompleted}
		        		startNew={this.state.startNewQuiz} />
		        </div>
	        </div>
	    );
	}
}

export default QuizContainer;
