import React from 'react';
import './countdowntimers.css';

class FoodTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      time: {}, 
      seconds: 3599,
      restart: false,
      };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
  }


  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.setState({
        seconds: 3599,
      });
      this.timer = setInterval(this.countDown, 1000);      
    }
  }

  restartTimer(){
    this.setState({
      restart: true,
    });
  }


  countDown() {
    if(this.props.restart){
      this.restartTimer();
      //boom info back, zeby zmienic restart na false <---
      this.props.pls();
    }

    if(!this.props.alive){
      console.log('pet died babe');
      clearInterval(this.timer);
      //this.props.petDied('hunger');
    }

    if(!this.state.restart){
    // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      // Check if we're at zero.
      if (seconds === 0) { 
        clearInterval(this.timer);
        this.props.petDied('hunger');
        //PET DEAD
      }
    }
    else {
      let seconds = 3599;
      this.setState({
        restart: false,
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    }
  }

 renderMinutesWithZero(){
  return(
    <div>
      <h3 className="timer wash-timer">
        0{this.state.time.m}:{this.state.time.s}
        {this.props.restart}
      </h3>
    </div>
  );
}

renderSecondsWithZero(){
  return(
    <div>
      <h3 className="timer food-timer">
        {this.state.time.m}:0{this.state.time.s}
        {this.props.restart}
      </h3>
    </div>
  );
}

renderBothWithZero(){
  return(
    <div>
      <h3 className="timer food-timer">
        0{this.state.time.m}:0{this.state.time.s}
        {this.props.restart}
      </h3>
    </div>
  );
}

renderNormalTimer(){
  return(
      <div>
        {/*<button onClick={this.restartTimer}>Restart</button>*/}
        <h3 className="timer food-timer">
          {this.state.time.m}:{this.state.time.s}
          {this.props.restart}
        </h3>
      </div>
    );
}

renderOtherTimer(){
  return(
    <div>
        {
          (this.state.time.m < 10 && this.state.time.s > 9) ?
            this.renderMinutesWithZero()
            : this.renderOtherOtherTimer()
        }
      </div>
  );
}

renderOtherOtherTimer(){
  return(
    <div>
        {
          (this.state.time.m > 9 && this.state.time.s < 10) ?
            this.renderSecondsWithZero()
            : this.renderNormalTimer()
        }
      </div>
  );
}

  render() {
    return (
      <div>
        {
          (this.state.time.m < 10 && this.state.time.s < 10) ?
            this.renderBothWithZero()
            : this.renderOtherTimer()
        }
      </div>
    );

  }
}

export default FoodTimer;