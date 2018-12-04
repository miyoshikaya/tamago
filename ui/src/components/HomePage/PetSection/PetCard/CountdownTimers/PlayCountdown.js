import React from 'react';
import ReactCountdownClock  from 'react-countdown-clock';

class PlayCountdown extends React.Component {
	constructor(props){
		super(props);

		this.state={
			countdownPause: this.props.pause,
      completions: 0,
      alive: true,
		}
	}

deadPet = () => {
  this.setState(
    {
      alive: false,
    },
  )
  alert('Your pet is dead :( It died because of loneliness');
}

restart = () => {
  this.setState(
    {
      completions: this.state.completions + 1
    },
  )
}

componentWillMount(){

}

	render () {
    return (
    	<div>
    		<ReactCountdownClock 
                  key={this.state.completions}
                  seconds={500}
                  color="#ff3a51"
                  alpha={0.9}
                  size={100}
                  paused={this.props.pause}
                  onComplete={this.deadPet}
                  onClick={this.restart} />
    	</div>
    );
}

}

export default PlayCountdown;