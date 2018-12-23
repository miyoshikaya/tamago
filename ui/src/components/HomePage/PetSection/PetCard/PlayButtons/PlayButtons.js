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
        <button className="status-btn" title='Feed' onClick={this.toggleFood.bind(this)}>
          <span role="img" aria-labelledby="banana">🍌</span>
        </button>
        <button className="status-btn" title='Wash' onClick={this.toggleWash.bind(this)}>
          <span role="img" aria-labelledby="water">💦</span>
        </button>
        <button className="status-btn" title='Play music' onClick={this.toggleMusic.bind(this)}>
          <span role="img" aria-labelledby="piano">🎹</span>
        </button>
      </div>
    );
  }
}

export default PlayButtons;