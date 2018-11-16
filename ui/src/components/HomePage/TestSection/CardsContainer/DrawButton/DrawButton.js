import React, { Component } from 'react';
import './drawbutton-style.css';

class DrawButton extends Component{
    constructor(props){
        super(props);

        this.drawCard = this.drawCard.bind(this);
    }

    drawCard(){
        this.props.drawCard();
    }

    render() {
        return(
            <div className="button-container">
                <button className="btn" onClick={this.drawCard}><span>Next</span></button>
            </div>
        );
    }
}

export default DrawButton