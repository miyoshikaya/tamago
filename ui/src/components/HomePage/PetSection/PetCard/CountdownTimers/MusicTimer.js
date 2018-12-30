import React from 'react';
import './countdowntimers.css';
import { firebase } from '../../../../../firebase';
import { db } from '../../../../../firebase';



class MusicTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      time: {},
      seconds: 91000,
      restart: false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  secondsToTime(secs) {
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
    this.getUserData();
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.setState({
        seconds: this.props.seconds,
      });
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  restartTimer() {
    this.setState({
      restart: true,
    });
  }

  async getUserData() {
    var user = db.onceGetUser(firebase.auth.currentUser.uid).then(snapshot => snapshot.val());
    await user.then((value) => {
      this.setState({
        user: value
      })
    });
    await this.setNewMusicTimer();

    var userNew = db.onceGetUser(firebase.auth.currentUser.uid).then(snapshot => snapshot.val());
    await userNew.then((value) => {
      this.setState({
        user: value
      })
    });
    await this.setState({
      seconds: this.state.user.timers[3].timer
    })

  }
  async setNewMusicTimer() {
    var timeStamp = Math.floor(Date.now() / 1000);
    var newTimerMusic = this.state.user.timers[3].timer;

    var timestampMusic = this.state.user.timers[3].timestamp;

    var diffMusic = timeStamp - timestampMusic;

    var newTimer = Math.max(newTimerMusic - diffMusic, 1);

    await db.setTimer(firebase.auth.currentUser.uid, newTimer, 3, "music", Math.floor(Date.now() / 1000));
  }

  async setMusicTimer(seconds) {
    await db.setTimer(firebase.auth.currentUser.uid, seconds, 3, "music", Math.floor(Date.now() / 1000));

  }


  countDown() {
    if (this.props.restart) {
      this.restartTimer();
      this.props.pls();
    }

    if (!this.props.alive) {
      clearInterval(this.timer);
    }

    if (!this.state.restart) {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      // Check if we're at zero.
      if (seconds === 0) {
        clearInterval(this.timer);
        this.props.petDied('boredom');
        //PET DEAD
      }
    }
    else {
      let seconds = 43200;
      this.setState({
        restart: false,
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      this.setMusicTimer(seconds);
    }

  }

  renderMinutesWithZero() {
    return (
      <div>
        <h3 className="timer music-timer">
          {this.state.time.h}:0{this.state.time.m}:{this.state.time.s}
          {this.props.restart}
        </h3>
      </div>
    );
  }

  renderSecondsWithZero() {
    return (
      <div>
        <h3 className="timer music-timer">
          {this.state.time.h}:{this.state.time.m}:0{this.state.time.s}
          {this.props.restart}
        </h3>
      </div>
    );
  }

  renderBothWithZero() {
    return (
      <div>
        <h3 className="timer music-timer">
          {this.state.time.h}:0{this.state.time.m}:0{this.state.time.s}
          {this.props.restart}
        </h3>
      </div>
    );
  }

  renderNormalTimer() {
    return (
      <div>
        {/*<button onClick={this.restartTimer}>Restart</button>*/}
        <h3 className="timer music-timer">
          {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
          {this.props.restart}
        </h3>
      </div>
    );
  }

  renderOtherTimer() {
    return (
      <div>
        {
          (this.state.time.m < 10 && this.state.time.s > 9) ?
            this.renderMinutesWithZero()
            : this.renderOtherOtherTimer()
        }
      </div>
    );
  }

  renderOtherOtherTimer() {
    return (
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
    if (this.state.time.h < 25) {
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
    else {
      return null;
    }

  }
}

export default MusicTimer;