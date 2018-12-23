import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
  if (props.currQuestion !== '') {
    return (
      <div className="questionCount">
        Question {props.counter} of {props.total}
      </div>
    );
  }
  else {
    return (
      <div className="questionCount">

      </div>);
  }
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;