import React from 'react';
import './playbuttons.css'

class PlayButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: true,
      addClass2: false,
      addClass3: false
    }
  }

  render () {
    
    return (
      <div className='play-buttons'>
        <button className="status-btn" title='Play'>
          <span role="img" aria-labelledby="ball">⚾</span>
        </button>
        <button className="status-btn" title='Feed'>
          <span role="img" aria-labelledby="banana">🍌</span>
        </button>
        <button className="status-btn" title='Wash'>
          <span role="img" aria-labelledby="water">💦</span>
        </button>
        <button className="status-btn" title='Play music'>
          <span role="img" aria-labelledby="piano">🎹</span>
        </button>
      </div>
    );
  }
}

export default PlayButtons;