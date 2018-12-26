import React from 'react';
import './petcard.css';
import { firebase } from '../../../../firebase';
import { db } from '../../../../firebase';

import PetItems from './PetItems/PetItems.js';
import PetPic from './PetPic/PetPic.js';
import PlayButtons from './PlayButtons/PlayButtons.js';

import PlayTimer from './CountdownTimers/PlayTimer.js';
import FoodTimer from './CountdownTimers/FoodTimer.js';
import WashTimer from './CountdownTimers/WashTimer.js';
import MusicTimer from './CountdownTimers/MusicTimer.js';

class PetCard extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);


    this.state = {
      user: null,
      pet: '',
      playItems: 0,
      foodItems: 0,
      washItems: 0,
      musicItems: 0,
      resetCountdown: false,
      countdownTime: 400,
      restartPlay: false,
      restartFood: false,
      restartWash: false,
      restartMusic: false,
      timeStamp: Math.floor(Date.now() / 1000),
      alive: true,
    }

    this.getItemClick = this.getItemClick.bind(this);
    this.restartPlayTimer = this.restartPlayTimer.bind(this);
    this.restartFoodTimer = this.restartFoodTimer.bind(this);
    this.restartWashTimer = this.restartWashTimer.bind(this);
    this.restartMusicTimer = this.restartMusicTimer.bind(this);
  }

  componentWillMount() {
    //console.log(this.state.timeStamp);
    
  }

  async getUserData() {
    var user = db.onceGetUser(firebase.auth.currentUser.uid).then(snapshot => snapshot.val());
    await user.then((value) => {
      this.setState({
        user: value
      })
    });
    await this.setState({
      playItems: this.state.user.pet_items[0].number,
      foodItems: this.state.user.pet_items[1].number,
      washItems: this.state.user.pet_items[2].number,
      musicItems: this.state.user.pet_items[3].number,
      alive: this.state.user.alive,
    });
    console.log(this.state.user);
    console.log('alive: ' + this.state.alive);
  }

  componentDidMount() {
    this.getUserData();
  }

  componentWillUnmount() {

  }

  addItems(n, itemName) {
    switch (itemName) {
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


  async getItemClick(itemType) {
    
    switch (itemType) {

      case 'play':
        if (this.state.playItems > 0) {
          var user = this.state.user;
          user.pet_items[0].number = user.pet_items[0].number - 1;
          await this.setState({
            playItems: this.state.playItems - 1,
            user: user,
            restartPlay: true,
          });
          db.setItem(firebase.auth.currentUser.uid, 0, "play", user.pet_items[0].number);
          //here countdown timer reset (SEND DATA TO COMPONENT) 

          console.log(this.state.restartPlay);
        }
        else
          alert("You have 0 ⚾!");
        break;

      case 'food':
        if (this.state.foodItems > 0) {
          user = this.state.user;
          user.pet_items[1].number = user.pet_items[1].number - 1;
          await this.setState({
            foodItems: this.state.foodItems - 1,
            user: user,
            restartFood: true,
          });
          db.setItem(firebase.auth.currentUser.uid, 1, "food", user.pet_items[1].number);

          console.log('food');
        }
        else
          alert("You have 0 🍌!");
        break;

      case 'wash':
        if (this.state.washItems > 0) {
          user = this.state.user;
          user.pet_items[2].number = user.pet_items[2].number - 1;
          await this.setState({
            washItems: this.state.washItems - 1,
            user: user,
            restartWash: true,
          });
          db.setItem(firebase.auth.currentUser.uid, 2, "wash", user.pet_items[2].number);

        }
        else
          alert("You have 0 💦!");
        break;

      case 'music':
        if (this.state.musicItems > 0) {
          user = this.state.user;
          user.pet_items[3].number = user.pet_items[3].number - 1;
          await this.setState({
            musicItems: this.state.musicItems - 1,
            user: user,
            restartMusic: true,
          });
          db.setItem(firebase.auth.currentUser.uid, 3, "music", user.pet_items[3].number);

        }
        else
          alert("You have 0 🎹!");
        break;

      default:
        break;
    }

  }

  restartPlayTimer() {
    this.setState({
      restartPlay: false,
    });
  }
  restartFoodTimer() {
    this.setState({
      restartFood: false,
    });
  }
  restartWashTimer() {
    this.setState({
      restartWash: false,
    });
  }
  restartMusicTimer() {
    this.setState({
      restartMusic: false,
    });
  }

  deadPet = (reason) => {
    this.setState(
      {
        alive: false,
        reason: reason,
      },
    );
    alert('Your pet is dead :( It died because of ' + reason + '.')
  }


  render() {
    if (this.state.user !== null) {
      return (
        <div className="centered-study" id="mainWrap">
          <div className="half">
            <div id="countersWrapperCard">
              <div className="two-timers">
                <div className="timer">
                  <p>Time to next playtime:</p>
                  <div className="countdown">
                    <PlayTimer
                      restart={this.state.restartPlay}
                      pls={this.restartPlayTimer}
                      petDied={this.deadPet}
                      alive={this.state.alive} />
                  </div>
                </div>
                <div className="timer">
                  <p>Time to next feeding:</p>
                  <div className="countdown">
                    <FoodTimer
                      restart={this.state.restartFood}
                      pls={this.restartFoodTimer}
                      petDied={this.deadPet}
                      alive={this.state.alive} />
                  </div>
                </div>
              </div>
              <div className="two-timers">
                <div className="timer">
                  <p>Time to next washing:</p>
                  <div className="countdown">
                    <WashTimer
                      restart={this.state.restartWash}
                      pls={this.restartWashTimer}
                      petDied={this.deadPet}
                      alive={this.state.alive} />
                  </div>
                </div>
                <div className="timer">
                  <p>Time to next music:</p>
                  <div className="countdown">
                    <MusicTimer
                      restart={this.state.restartMusic}
                      pls={this.restartMusicTimer}
                      petDied={this.deadPet}
                      alive={this.state.alive} />
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
              <PetPic alive={this.state.alive} />
              <hr />
              <PlayButtons
                sendItemClick={this.getItemClick} />
            </div>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default PetCard;