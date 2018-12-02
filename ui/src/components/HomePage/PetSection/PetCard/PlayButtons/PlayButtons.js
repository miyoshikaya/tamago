import React from 'react';
import './playbuttons.css'

class PlayButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: true,
      addClass2: false,
      addClass3: false,
    }
  }


  async sendData(playType) {
    this.props.sendPlayTypeClick(playType);
  }

  async togglePlay(){
    this.props.sendItemClick('play');
  }
  async toggleFood(){
    this.props.sendItemClick('food');
  }
  async toggleWash(){
    this.props.sendItemClick('wash');
  }
  async toggleMusic(){
    this.props.sendItemClick('music');
  }

  render () {
    
    return (
      <div className='play-buttons'>
        <button className="status-btn" title='Play' onClick={this.togglePlay.bind(this)}>
          <span role="img" aria-labelledby="ball">⚾</span>
        </button>
        <button className="status-btn" title='Feed'>
          <span role="img" aria-labelledby="banana" onClick={this.toggleFood.bind(this)}>🍌</span>
        </button>
        <button className="status-btn" title='Wash'>
          <span role="img" aria-labelledby="water" onClick={this.toggleWash.bind(this)}>💦</span>
        </button>
        <button className="status-btn" title='Play music'>
          <span role="img" aria-labelledby="piano" onClick={this.toggleMusic.bind(this)}>🎹</span>
        </button>
      </div>
    );
  }
}

export default PlayButtons;