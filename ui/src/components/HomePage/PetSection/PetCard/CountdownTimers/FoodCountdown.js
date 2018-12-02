import React from 'react';
import ReactCountdownClock  from 'react-countdown-clock';

class FoodCountdown extends React.Component {
	constructor(props){
		super(props);

		this.state={
			countdownPause: this.props.pause,
		}
	}



	render () {
    return (
    	<div>
    		<ReactCountdownClock 
                  seconds={600}
                  color="#ff3a51"
                  alpha={0.9}
                  size={100}
                  /*onComplete={myCallback}*/
                  paused={this.props.pause} />
    	</div>
    );
}

}

export default FoodCountdown;