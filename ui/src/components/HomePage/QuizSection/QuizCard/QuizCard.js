import React from 'react';
import './quizcard.css';
import QuizSettings from './QuizSettings/QuizSettings.js';

class QuizCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'animals',
      words: 'learning',
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        nintendo: 0,
        microsoft: 0,
        sony: 0
      },
      result: ''
    };
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
          <hr />
          {/*<Quiz />*/}
        </div>
        
      </div>
    );
  }
}

export default QuizCard;