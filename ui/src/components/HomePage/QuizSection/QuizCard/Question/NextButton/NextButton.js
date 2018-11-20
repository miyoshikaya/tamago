import React, { Component } from 'react';

class NextButton extends Component{
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
                <button className="btn"><span>Next</span></button>
            </div>
        );
    }
}

export default NextButton