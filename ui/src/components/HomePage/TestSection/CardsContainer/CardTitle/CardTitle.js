import React, { Component } from 'react';
import './cardtitle.css';

class CardTitle extends Component {

	constructor(props){
    super(props);

    this.state = {
      lala: ''
    }
    console.log('lala');
    
  }

  render() {
    return (
      <div id="card-Title">
        <span>{this.props.language}</span>{' ' + this.props.category}
        <div id="preview-Title">
          {this.props.status}
        </div>
      </div>
    );
  }

}

export default CardTitle;