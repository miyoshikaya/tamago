import React from 'react';
import Dropdown from './Dropdown/Dropdown.js';
import './settingscontainer.css';


class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addClass: true,
      addClass2: false,
      addClass3: false,
      language: 'Japanese',
      status: 'Learning',
      category: 'lala'
    };
  }

  async toggle1() {

    this.props.sendStatus('Learning');

  }

  async toggle2() {

    this.props.sendStatus('Learnt');
  }

  async toggle3() {

    this.props.sendStatus('Mastered');
  }

  changeCategory = async (cat) => {
    await this.setState({ category: cat });
    this.props.sendCategory(this.state.category);
  }


  render() {
    let boxClass = ["status-btn"];
    let boxClass2 = ["status-btn"];
    let boxClass3 = ["status-btn"];
    // if(this.state.addClass) {
    //   boxClass.push('active');
    // }
    // if(this.state.addClass2) {
    //   boxClass2.push('active');
    // }
    // if(this.state.addClass3) {
    //   boxClass3.push('active');
    // }
    switch (this.props.status) {
      case 'Learning':
        boxClass.push('active');
        break;
      case 'Learnt':
        boxClass2.push('active');
        break;
      case 'Mastered':
        boxClass3.push('active');
        break;
      default:
        break;
    }
    return (
      <div id="cardSettingsWrapper">
        <div className="statusWrapper">
          <div className="status">
            <div className="statusTitle">Change word status:</div>
            <div className='status-buttons'>
              <button className={boxClass.join(' ')} onClick={this.toggle1.bind(this)} title='Learning'>
                &#9998;
                  </button>
              <button className={boxClass2.join(' ')} onClick={this.toggle2.bind(this)} title='Learnt'>
                &#x2606;
                  </button>
              <button className={boxClass3.join(' ')} onClick={this.toggle3.bind(this)} title='Mastered'>
                &#9812;
                  </button>
            </div>
          </div>
        </div>
        <hr className="hr-class" />
        <div className="categoryDropdownWrapper">
          <div className="dropdown">
            <div className="settings-dropdown-title">Choose category (and draw a new card):</div>
            <div className="categoryDropdownOption">
              <Dropdown handleCategoryChange={this.changeCategory} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsContainer;