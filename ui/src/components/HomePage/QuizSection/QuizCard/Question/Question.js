import React from 'react';
import PropTypes from 'prop-types';
import './question.css';

  function Question(props) {
    return (
      <h4 className="question">{props.content}</h4>
    );
  }

  Question.propTypes = {
    content: PropTypes.string.isRequired
  };

export default Question;