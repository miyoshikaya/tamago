import React, { Component } from 'react';

class CardTitle extends Component {

	constructor(props){
    super(props);

    this.state = {
      language: 'Language',
      category: 'Category',
      status: 'Status'
    }
    
  }

  render() {
    return (
      <div id="preview-Title">
        <span>{this.state.language}</span>{' ' + this.state.category}
        <div id="preview-Title">
          {this.state.status}
        </div>
      </div>
    );
  }

}

export default CardTitle;