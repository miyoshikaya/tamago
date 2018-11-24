import React, { Component } from 'react';

class CardTitle extends Component {

	constructor(props){
    super(props);

    this.state = {
      lala: ''
    }
    
  }

  render() {
    return (
      <div id="preview-Title">
        <span>{this.props.language}</span>{' ' + this.props.category}
        <div id="preview-Title">
          {this.props.status}
        </div>
      </div>
    );
  }

}

export default CardTitle;