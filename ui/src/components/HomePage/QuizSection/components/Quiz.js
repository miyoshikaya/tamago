import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  console.log(props.generateNew)
  props.loadDatabase();
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} currQuestion={props.currQuestion} />
        <Question content={props.currQuestion} />
        <ul className="currentAnswers">
          {props.currentAnswers.map(renderAnswerOptions)}
        </ul>
      </div>
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  currentAnswers: PropTypes.array.isRequired,
  currQuestion: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  loadDatabase: PropTypes.func.isRequired,

};

export default Quiz;