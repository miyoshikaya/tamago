import React from 'react';

class FoodTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      time: {}, 
      seconds: 5,
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
        seconds: 5,
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
      let seconds = 5;
      this.setState({
        restart: false,
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    }
  }

  render() {
    return(
      <div>
        {/*<button onClick={this.restartTimer}>Restart</button>*/}
        <h3>
          {this.state.time.m} : {this.state.time.s}
          {this.props.restart}
        </h3>
      </div>
    );
  }
}

export default FoodTimer;