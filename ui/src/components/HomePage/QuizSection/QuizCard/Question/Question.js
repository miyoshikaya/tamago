import React from 'react';
import './questions.css'
import AnswerButtons from './AnswerButtons/AnswerButtons.js';
import NextButton from './NextButton/NextButton.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      answer: 'correct'
    }
  }
 

  render () {
    return (
    	<div id="questionWrapper">
        	<hr />
        	<Question />
            <h4>1. Question here lalal what is neko??</h4>
            <AnswerButtons />
            <div id="nextWrapper">
              <NextButton />
            </div>
        </div>
    );
  }
}

export default Question;