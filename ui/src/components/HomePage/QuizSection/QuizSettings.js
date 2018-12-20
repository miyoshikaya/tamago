import React from 'react';
import WordStatusCheckbox from './settings-components/WordStatusCheckbox.js';
import './quizsettings.css';

class QuizSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'Animals',
    }

    this.changeCategory = this.changeCategory.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }


  changeCategory = (cat) => {
    switch (cat) {
      case 'Animals':
        this.setState({
          category: cat,
        });

        break;
      case 'People':
        this.setState({
          category: cat,
        });
        break;
      case 'Food':
        this.setState({
          category: cat,
        });
        break;
      case 'School':
        this.setState({
          category: cat,
        });
        break;
      case 'House':
        this.setState({
          category: cat,
        });
        break;
      default:
        break;
    }
    this.props.sendCategory(this.state.category);
  }

  startQuiz() {
    console.log(this.state.category);
    //pop the info to the quiz component -> to generate new quiz
  }

  render() {
    return (
      <div>
        <div id="title">Choose your quiz category!</div>
        <div id="category-choose">

        </div>
        <div id="title">Choose words' status!</div>
        <div id="category-choose">
          <Dropdown handleCategoryChange={this.changeCategory} />
          <div className="begin-button">
            <button className="button button-4" onClick={this.lala}>Begin!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizSettings;