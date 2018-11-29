import React from 'react';
import WordStatusCheckbox from './settings-components/WordStatusCheckbox.js';
import './quizsettings.css';

class QuizSettings extends React.Component {
  
  lala () {
    console.log("yup it's a button");
    //if not enough words in said category -> pop-up with info
  }

  render () {
    return (
      <div>
        <div id="title">Choose your quiz category!</div>
        <div id="category-choose">

        </div>
        <div id="title">Choose words' status!</div>
        <div id="category-choose">
          <WordStatusCheckbox />
          <div className="begin-button">
            <button className="button button-4" onClick={this.lala}>Begin!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizSettings;