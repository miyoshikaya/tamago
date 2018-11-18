import React, { Component } from 'react';
import './cardtitle.css';

class CardTitle extends Component {

	constructor(props){
    super(props);

    this.state = {
      type: 'Type',
      name: 'Name',
      status: 'Status'
    }
    
  }

  render() {
    return (
      <div id="preview-Pet-Title">
        {this.state.type}<span>{' ' + this.state.name}</span>
        <div id="preview-Pet-Title">
          {this.state.status}
        </div>
      </div>
    );
  }

}

export default CardTitle;