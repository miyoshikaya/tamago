import React, { Component } from 'react';
import './cardtitle.css';

class PetItems extends Component {

	constructor(props){
    super(props);

    this.state = {
      status: 'Status',
      playItems: this.props.play,
      foodItems: this.props.food,
      washItems: this.props.wash,
      musicItems: this.props.music,
    }
    
  }

  render() {
    return (
      <div id="preview-Pet-Title">
        You have:
        <div id="preview-Pet-Title">
          <span role="img" aria-labelledby="ball">⚾</span>: {' ' + this.props.play} &nbsp;
          <span role="img" aria-labelledby="banana">🍌</span>: {' ' + this.props.food} &nbsp;
          <span role="img" aria-labelledby="water">💦</span>: {' ' + this.props.wash} &nbsp;
          <span role="img" aria-labelledby="piano">🎹</span>: {' ' + this.props.music} &nbsp;
        </div>
      </div>
    );
  }

}

export default PetItems;