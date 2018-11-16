import React, { Component } from 'react';
import './flipbutton-style.css';

class FlipButton extends Component{
    constructor(props){
        super(props);

        this.flipCard = this.flipCard.bind(this);
    }

    flipCard(){
        this.props.flipCard();
    }

    render() {
        return(
            <div className="button-container">
                <button className="btn" onClick={this.flipCard}><span>Flip</span></button>
            </div>
        );
    }
}

export default FlipButton