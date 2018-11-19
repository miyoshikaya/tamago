import React from 'react';
import './quizcard.css';
import QuizSettings from './QuizSettings/QuizSettings.js';
import Question from './Question/Question.js';

class QuizCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: 'animals',
      words: 'learning'
    }
  }

  changeCategory = (cat) => {
    this.setState({
      category: cat
    });
  }
 

  render () {
    return (
    <div className="centered" id="main-Container">
        <div className="half purple">
          <QuizSettings />
        </div>
        <div className="other-half">
          <Question />
        </div>
        
      </div>
    );
  }
}

export default QuizCard;