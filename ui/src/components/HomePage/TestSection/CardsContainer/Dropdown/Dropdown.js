import React from 'react';
import './dropdown.css';

class Dropdown extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showDrop: false,
      value: 'select ⮯',
      category: 'animals'
    }
    
    this.showDrop = this.showDrop.bind(this);
    this.hideDrop = this.hideDrop.bind(this);
  }
  
  showDrop(event) {
    event.preventDefault();
    
    this.setState({ showDrop: true }, () => {
      document.addEventListener('click', this.hideDrop);
    });
  }
  
  hideDrop(event) {
    this.setState({ showDrop: false }, () => {
      document.removeEventListener('click',     this.hideDrop);
    });
  }

  handleChange = (category) => () => {
    console.log(category);
    var catWithArrow = category + ' ⮯';
    this.setState({ value: catWithArrow, showDrop: false });
  }

  render () {
    return (
      <div className='dropMenu'>
        <button className='drop-btn' onClick={this.showDrop}>{this.state.value}</button>
      
      {
      this.state.showDrop ? (
        <ul className='dropDown'>
          <li className="elem" onClick={this.handleChange("Animals")}>Animals</li>
          <li className="elem" onClick={this.handleChange("People")}>People</li>
          <li className="elem" onClick={this.handleChange("School")}>School</li>
          <li className="elem" onClick={this.handleChange("House")}>House</li>
          <li className="elem" onClick={this.handleChange("Birthday")}>Birthday</li>
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