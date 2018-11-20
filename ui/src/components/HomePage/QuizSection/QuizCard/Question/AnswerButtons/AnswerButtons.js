import React from 'react';
import './answerbuttons.css';

class AnswerButtons extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      answer: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
      checked: false,
      correctAnswer: false
    }
  }

componentWillMount(){
  this.setState({
    answerA: '魚',
    answerB: '魚',
    answerC: '魚',
    answerD: '魚',
    answer: 'A'
  });
}

chooseA(){
   if(this.state.answer === 'A'){
    this.setState({
      correctAnswer: true,
      checked: !this.state.checked
    });
   }
}
chooseB(){
   if(this.state.answer === 'B'){
    this.setState({
      correctAnswer: true,
      checked: !this.state.checked
    });
   }
}
chooseC(){
   if(this.state.answer === 'C'){
    this.setState({
      correctAnswer: true,
      checked: !this.state.checked
    });
   }
}
chooseD(){
   if(this.state.answer === 'D'){
    this.setState({
      correctAnswer: true,
      checked: !this.state.checked
    });
   }
}

  render () {
    let answer_class_A;
    let answer_class_B;
    let answer_class_C;
    let answer_class_D;
    if(this.state.answer === 'A'){
      answer_class_B = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      answer_class_C = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      answer_class_D = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      if(this.state.correctAnswer === true){
        answer_class_A = this.state.checked ? "btn-answer correct-answer" : "btn-answer"; 
      } else if(this.state.correctAnswer === false) {
        answer_class_A = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      }
    }
    if(this.state.answer === 'B'){
      if(this.state.correctAnswer === true){
        answer_class_B = this.state.checked ? "btn-answer correct-answer" : "btn-answer"; 
      } else if(this.state.correctAnswer === false) {
        answer_class_B = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      }
    }
    if(this.state.answer === 'C'){
      if(this.state.correctAnswer === true){
        answer_class_C = this.state.checked ? "btn-answer correct-answer" : "btn-answer"; 
      } else if(this.state.correctAnswer === false) {
        answer_class_C = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      }
    }
    if(this.state.answer === 'D'){
      if(this.state.correctAnswer === true){
        answer_class_D = this.state.checked ? "btn-answer correct-answer" : "btn-answer"; 
      } else if(this.state.correctAnswer === false) {
        answer_class_D = this.state.checked ? "btn-answer incorrect-answer" : "btn-answer"; 
      }
    }

    return (
      <div className="buttons-container">
        <div className="btn-row">
          <button className={answer_class_A} onClick={this.chooseA.bind(this)}>{this.state.answerA}</button>
          <button className={answer_class_B} onClick={this.chooseB.bind(this)}>{this.state.answerB}</button>
        </div>
        <div className="btn-row">
          <button className={answer_class_C} onClick={this.chooseC.bind(this)}>{this.state.answerC}</button>
          <button className={answer_class_D} onClick={this.chooseD.bind(this)}>{this.state.answerD}</button>
        </div>
      </div>
    );
  }
}

export default AnswerButtons;