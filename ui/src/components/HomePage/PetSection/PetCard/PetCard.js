import React from 'react';
import CardTitle from './CardTitle/CardTitle.js';
import PetPic from './PetPic/PetPic.js';
import PlayButtons from './PlayButtons/PlayButtons.js';
import ReactCountdownClock  from 'react-countdown-clock';
import './petcard.css';

class PetCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
      pet: '',
      playItems: 0,
      foodItems: 0,
      washItems: 0,
      musicItems: 0,
    }
  }

  addItems(n, itemName) {
    switch(itemName){
    case 'play':
      this.setState({
        playItems: this.state.playItems + n,
      });
      console.log(this.state.playItems);
      break;
    case 'food':
      this.setState({
        foodItems: this.state.foodItems + n,
      });
      break;
    case 'wash':
      this.setState({
        washItems: this.state.washItems + n,
      });
      break;
    case 'music':
      this.setState({
        musicItems: this.state.musicItems + n,
      });
      break;
    default:
      break;
    }
  }

  render () {
    return (
      <div className="centered-study" id="mainWrap">
      <div className="half">
        <div id="countersWrapperCard">
          <div className="two-timers">
            <div className="timer">
              <p>Time to next playtime:</p>
              <div className="countdown">
                <ReactCountdownClock 
                  seconds={300}
                  color="#ff3a51"
                  alpha={0.9}
                  size={100}
                  /*onComplete={myCallback}*/ />
                </div>
            </div>
            <div className="timer">
              <p>Time to next feeding:</p>
              <div className="countdown">
                <ReactCountdownClock 
                  seconds={300}
                  color="#ffc423"
                  alpha={0.9}
                  size={100}
                  /*onComplete={myCallback}*/ />
                </div>
            </div>
          </div>
          <div className="two-timers">
            <div className="timer">
              <p>Time to next washing:</p>
              <div className="countdown">
                <ReactCountdownClock 
                  seconds={300}
                  color="#4e8cce"
                  alpha={0.9}
                  size={100}
                  /*onComplete={myCallback}*/ />
                </div>
            </div>
            <div className="timer">
              <p>Time to next music:</p>
              <div className="countdown">
                <ReactCountdownClock 
                  seconds={300}
                  color="#000"
                  alpha={0.9}
                  size={100}
                  /*onComplete={myCallback}*/ />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="half purple">
        <div id="lang-title">
          <CardTitle />
          <hr />
          <PetPic />
          <hr />
          <PlayButtons />
        </div>
      </div>
    </div>
    );
  }
}

export default PetCard;