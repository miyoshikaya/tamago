import React from 'react';
import './quizsettings.css';
import Dropdown from './settings-components/Dropdown.js';

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
    switch(cat){
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
  }

  startQuiz () {
    console.log(this.state.category);
    //pop the info to the quiz component -> to generate new quiz
  }

  render () {
    return (
      <div>
        <div id="title">Choose your quiz category!</div>
        <div id="category-choose">
          
        </div>
        <div id="category-choose">
          <Dropdown handleCategoryChange={this.changeCategory}/>
          <div className="begin-button">
            <button className="button button-4" onClick={this.startQuiz}>Begin!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizSettings;