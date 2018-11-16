import React from 'react';
import './dropdown.css';

class Dropdown extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showDrop: true,
      value: 'japanese ⮯',
      category: 'japanese'
    }
    
    this.showDrop = this.showDrop.bind(this);
    /*this.hideDrop = this.hideDrop.bind(this);*/
  }
  
  showDrop(event) {
    event.preventDefault();
    

    this.setState({ showDrop: true }, () => {
      document.addEventListener('click', this.showDrop);
    });
  }
  
  hideDrop(event) {
    this.setState({ showDrop: false }, () => {
      document.removeEventListener('click',     this.hideDrop);
    });
  }

  handleChange = (language) => () => {
    console.log(language);
    var lanWithArrow = language + ' ⮯';
    this.setState({ value: lanWithArrow, showDrop: true });
  }

  render () {
    return (
      <div className='dropMenu'>
        <button className='drop-btn' onClick={this.showDrop}>{this.state.value}</button>
      
      {
      this.state.showDrop ? (
        <ul className='dropDown'>
          <li className="elem" onClick={this.handleChange("Japanese")}>Japanese</li>
          <li className="elem" onClick={this.handleChange("Korean")}>Korean</li>
          <li className="elem" onClick={this.handleChange("Polish")}>Polish</li>
        </ul>
        ) : (
          null
        )
      } 
      </div>
    );
  }
}

export default Dropdown;