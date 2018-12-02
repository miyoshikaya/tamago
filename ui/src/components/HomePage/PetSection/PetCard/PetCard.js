import React from 'react';
import PetItems from './PetItems/PetItems.js';
import PetPic from './PetPic/PetPic.js';
import PlayButtons from './PlayButtons/PlayButtons.js';
import ReactCountdownClock  from 'react-countdown-clock';
import './petcard.css';
import FoodCountdown from './CountdownTimers/FoodCountdown.js';

class PetCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
      pet: '',
      playItems: 5,
      foodItems: 5,
      washItems: 5,
      musicItems: 5,
      resetCountdown: false,
      countdownTime: 400,
      countdownPlayPause: false,
      timeStamp: Date(Date.now()),
    }

    this.getItemClick = this.getItemClick.bind(this);  
  }

  componentWillMount(){
    console.log(this.state.timeStamp.toString());
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


async getItemClick(itemType){
  switch(itemType){

    case 'play':
      if(this.state.playItems > 0){
        await this.setState({
          playItems: this.state.playItems - 1,
          countdownPlayPause: true,
        });
        //here countdown timer reset (SEND DATA TO COMPONENT) 
        console.log(this.state.countdownPlayPause);
      }
      else
        alert("You have 0 ⚾!");
      break;

    case 'food':
      if(this.state.foodItems > 0){
        await this.setState({
          foodItems: this.state.foodItems - 1,  
        });
      }
      else
        alert("You have 0 🍌!");
      break;

    case 'wash':
      if(this.state.washItems > 0){
        await this.setState({
          washItems: this.state.washItems - 1,  
        });
      }
      else
        alert("You have 0 💦!");
      break;

    case 'music':
      if(this.state.musicItems > 0){
        await this.setState({
          musicItems: this.state.musicItems - 1,  
        });
      }
      else
        alert("You have 0 🎹!");
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
                <FoodCountdown 
                pause={this.state.countdownPlayPause}/>
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
                  /*onComplete={myCallback}*/
                  paused={this.state.countdownFoodPause} />
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
          <PetItems 
          play={this.state.playItems} 
          food={this.state.foodItems} 
          wash={this.state.washItems}
          music={this.state.musicItems} />
          <hr />
          <PetPic />
          <hr />
          <PlayButtons
          sendItemClick={this.getItemClick} />
        </div>
      </div>
    </div>
    );
  }
}

export default PetCard;