import React from 'react';
import './dropdown.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Dropdown extends React.Component {
  constructor(props) {
    super();
    
    this.state = {
      showDrop: true,
      value: 'japanese ⮯',
      category: 'Japanese'
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
    if(language === this.state.category){
      alert("Your selected language is already " + language + ".");
    } 
    else {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do change your studying language to ' + language + '?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              var lanWithArrow = language + ' ⮯';
              this.setState({ value: lanWithArrow, showDrop: true, category: language });
              this.props.handleLanguageChange(language);
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