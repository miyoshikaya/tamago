import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super();
    
    this.state = {
      showDrop: true,
      value: 'Animals ⮯',
      category: 'Animals'
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


  handleChange = (category) => () => {
    if(category === this.state.category){
      alert("Your selected language is already " + category + ".");
    } 
    else {
      var lanWithArrow = category + ' ⮯';
      this.setState({ value: lanWithArrow, showDrop: true, category: category });
      this.props.handleCategoryChange(category);
    }
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
          <li className="elem" onClick={this.handleChange("Food")}>Food</li>
          <li className="elem" onClick={this.handleChange("School")}>School</li>
          <li className="elem" onClick={this.handleChange("House")}>House</li>

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