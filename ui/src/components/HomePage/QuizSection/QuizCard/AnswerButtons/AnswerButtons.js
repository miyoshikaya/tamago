import React from 'react';
import './answerbuttons.css';

class AnswerButtons extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      answer: 'correct',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: ''
    }
  }

componentWillMount(){
  this.setState({
    answerA: '魚'
  });
}

  render () {
    return (
      <div className="buttons-container">
        <div className="btn-row">
          <button className="btn-answer">{this.state.answerA}</button>
          <button className="btn-answer">魚</button>
        </div>
        <div className="btn-row">
          <button className="btn-answer">魚</button>
          <button className="btn-answer">魚</button>
        </div>
      </div>
    );
  }
}

export default AnswerButtons;