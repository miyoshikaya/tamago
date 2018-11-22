import React from 'react';
import './dropdown.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 

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
    if(category === this.state.category){
      alert("Your selected category is already " + category + ".");
    } 
    else {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do change your flashcards category to ' + category + '?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              var catWithArrow = category + ' ⮯';
              this.setState({ value: catWithArrow, showDrop: false, category: category });
              this.props.handleCategoryChange(category);
            }
          },
          {
            label: 'No'
          }
        ]
      })
    }
  }


  render () {
    return (
      <div className='dropMenu'>
        <button className='drop-btn' onClick={this.showDrop}>{this.state.value}</button>
      
      {
      this.state.showDrop ? (
        <ul className='dropDown'>
          <li className="elem" onClick={this.handleChange("animals")}>Animals</li>
          <li className="elem" onClick={this.handleChange("people")}>People</li>
          <li className="elem" onClick={this.handleChange("school")}>School</li>
          <li className="elem" onClick={this.handleChange("house")}>House</li>
          <li className="elem" onClick={this.handleChange("birthday")}>Birthday</li>
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