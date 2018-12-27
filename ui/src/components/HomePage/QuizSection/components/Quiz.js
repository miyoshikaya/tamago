import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  if (props.generateNew === true) {
    props.loadDatabase();
  }
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
  if (props.questions.length >= props.questionTotal) {


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
  else if (props.questions.length > 0) {
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
          <Question content={"Not enough words to quiz from!"} />
        </div>
      </CSSTransitionGroup>
    );
  }
  else {
    return null;
  }
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